var mysql = require("mysql");
var Botkit = require('botkit');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'cocaudbot'
});

db.connect();

function dbQuery(query, params)
{
	console.log("dbQuery : "+query);
	var p =  new Promise((resolve, reject) => {
		db.query(query, params, (err, results, fields) => {
			if(!err) resolve({results : results, fields : fields});
			else reject(err);
		});
	});
	p.catch(errorHandler);
	return p
}

function errorHandler(err)
{
	throw err;
}

function newUser(userId)
{
	return dbQuery("INSERT INTO points(user_id, points) VALUES( ?, 1);", [userId])
		.then(()=> console.log("Un nouvel arrivant dans la course au point cocaud ! ["+userId+"]"));
}

function updateUser(userId, nbPoints)
{
	return dbQuery("UPDATE points SET points = ? WHERE user_id = ?;", [nbPoints, userId])
		.then(() => console.log(userId+" à gangé un point !"));
}

function toPromise(fun, param)
{
	return new Promise((resolve, reject) => fun(param,(err, response) => !err ? resolve(response) : errorHandler(err)));
}

function populateUserInfo(bot, user)
{
	console.log("populate user");
	var p = toPromise(bot.api.users.info, {user : user.user_id}).then(
		({user : {name}}) => {
			console.log(name);
			user.name = name;
			return user;
		}, errorHandler);
	p.catch(errorHandler);
	return p;
}



var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: "xoxb-19054482290-mmm9VngXj1LUv7PnFwZhUjDo"
})
bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.on("hello", (bot, message) =>
{
	toPromise(bot.api.channels.list, {exclude_archived : true}).then(
		({channels}) => {for(let channel of channels) toPromise(bot.api.channels.join,{name : channel.name}).then(console.log)}
	).catch(errorHandler);
});

controller.on("reaction_added", function(bot, message)
{
	let channel = message.item.channel;
	let messageTimestamp = message.item.ts;

	toPromise(bot.api.reactions.get, {channel : channel, timestamp : messageTimestamp})
		.then(result => result.message.user, console.error)
		.then(userId => dbQuery("SELECT points, user_id FROM points WHERE user_id = ?", [userId]), console.error)
		.then(({results : [user]}) => !user ? newUser(user.user_Id) : updateUser(user.user_id, user.points + 1), console.error)
		.catch(errorHandler);
});

controller.hears('donne moi le classement', 'direct_message,direct_mention, mention',function(bot,command)
{
	dbQuery("SELECT user_id, points FROM points ORDER BY points DESC").then(
		result => {
			let promises = [];
			let users = result.results;
			
			console.log("before for");

			for(let user of users) promises.push(populateUserInfo(bot, user));

			console.log("before promise");
			Promise.all(promises).then(
				() => {
					console.log("promise all");
					let text = "Voici le classement :\n";
					console.log(text);
					for(let user of users) text += user.name + " : " + user.points + "\n";
					console.log(text);
					bot.reply(command, text);
				}, errorHandler).catch(errorHandler);
		}, errorHandler).catch(errorHandler);		
});



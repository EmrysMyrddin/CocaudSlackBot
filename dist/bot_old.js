'use strict';var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var mysql = require("mysql");
var Botkit = require('botkit');

var db = mysql.createConnection({ 
	host: 'localhost', 
	user: 'root', 
	password: 'toor', 
	database: 'cocaudbot' });


db.connect();

function dbQuery(query, params) 
{
	console.log("dbQuery : " + query);
	var p = new Promise(function (resolve, reject) {
		db.query(query, params, function (err, results, fields) {
			if (!err) resolve({ results: results, fields: fields });else 
			reject(err);});});


	p.catch(errorHandler);
	return p;}


function errorHandler(err) 
{
	throw err;}


function newUser(userId) 
{
	return dbQuery("INSERT INTO points(user_id, points) VALUES( ?, 1);", [userId]).
	then(function () {return console.log("Un nouvel arrivant dans la course au point cocaud ! [" + userId + "]");});}


function updateUser(userId, nbPoints) 
{
	return dbQuery("UPDATE points SET points = ? WHERE user_id = ?;", [nbPoints, userId]).
	then(function () {return console.log(userId + " à gangé un point !");});}


function toPromise(fun, param) 
{
	return new Promise(function (resolve, reject) {return fun(param, function (err, response) {return !err ? resolve(response) : errorHandler(err);});});}


function populateUserInfo(bot, user) 
{
	console.log("populate user");
	var p = toPromise(bot.api.users.info, { user: user.user_id }).then(
	function (_ref) {var name = _ref.user.name;
		console.log(name);
		user.name = name;
		return user;}, 
	errorHandler);
	p.catch(errorHandler);
	return p;}




var controller = Botkit.slackbot();
var bot = controller.spawn({ 
	token: "xoxb-19054482290-mmm9VngXj1LUv7PnFwZhUjDo" });

bot.startRTM(function (err, bot, payload) {
	if (err) {
		throw new Error('Could not connect to Slack');}});



controller.on("hello", function (bot, message) 
{
	toPromise(bot.api.channels.list, { exclude_archived: true }).then(
	function (_ref2) {var channels = _ref2.channels;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var channel = _step.value;toPromise(bot.api.channels.join, { name: channel.name }).then(console.log);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}).
	catch(errorHandler);});


controller.on("reaction_added", function (bot, message) 
{
	var channel = message.item.channel;
	var messageTimestamp = message.item.ts;

	toPromise(bot.api.reactions.get, { channel: channel, timestamp: messageTimestamp }).
	then(function (result) {return result.message.user;}, console.error).
	then(function (userId) {return dbQuery("SELECT points, user_id FROM points WHERE user_id = ?", [userId]);}, console.error).
	then(function (_ref3) {var _ref3$results = _slicedToArray(_ref3.results, 1);var user = _ref3$results[0];return !user ? newUser(user.user_Id) : updateUser(user.user_id, user.points + 1);}, console.error).
	catch(errorHandler);});


controller.hears('donne moi le classement', 'direct_message,direct_mention, mention', function (bot, command) 
{
	dbQuery("SELECT user_id, points FROM points ORDER BY points DESC").then(
	function (result) {
		var promises = [];
		var users = result.results;

		console.log("before for");var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

			for (var _iterator2 = users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var user = _step2.value;promises.push(populateUserInfo(bot, user));}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}

		console.log("before promise");
		Promise.all(promises).then(
		function () {
			console.log("promise all");
			var text = "Voici le classement :\n";
			console.log(text);var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
				for (var _iterator3 = users[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var user = _step3.value;text += user.name + " : " + user.points + "\n";}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
			console.log(text);
			bot.reply(command, text);}, 
		errorHandler).catch(errorHandler);}, 
	errorHandler).catch(errorHandler);});
//# sourceMappingURL=data:application/json;base64,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QWMsQ0FBZCxDQUF6RCxFQUF4QixFQUFtRyxRQUFRLEtBQVIsQ0FIMUc7QUFJRSxNQUpGLENBSVEsWUFKUixFQUpELENBRGdDLENBQWhDOzs7QUFZQSxXQUFXLEtBQVgsQ0FBaUIseUJBQWpCLEVBQTRDLHdDQUE1QyxFQUFxRixVQUFTLEdBQVQsRUFBYSxPQUFiO0FBQ3JGO0FBQ0MsU0FBUSx5REFBUixFQUFtRSxJQUFuRTtBQUNDLG1CQUFVO0FBQ1QsTUFBSSxXQUFXLEVBQVgsQ0FESztBQUVULE1BQUksUUFBUSxPQUFPLE9BQVAsQ0FGSDs7QUFJVCxVQUFRLEdBQVIsQ0FBWSxZQUFaLEVBSlM7O0FBTVQseUJBQWdCLGdDQUFoQiw2R0FBUSxvQkFBZSxTQUFTLElBQVQsQ0FBYyxpQkFBaUIsR0FBakIsRUFBc0IsSUFBdEIsQ0FBZCxHQUF2Qix3TkFOUzs7QUFRVCxVQUFRLEdBQVIsQ0FBWSxnQkFBWixFQVJTO0FBU1QsVUFBUSxHQUFSLENBQVksUUFBWixFQUFzQixJQUF0QjtBQUNDLGNBQU07QUFDTCxXQUFRLEdBQVIsQ0FBWSxhQUFaLEVBREs7QUFFTCxPQUFJLE9BQU8seUJBQVAsQ0FGQztBQUdMLFdBQVEsR0FBUixDQUFZLElBQVosRUFISztBQUlMLDBCQUFnQixnQ0FBaEIsNkdBQVEsb0JBQWUsUUFBUSxLQUFLLElBQUwsR0FBWSxLQUFaLEdBQW9CLEtBQUssTUFBTCxHQUFjLElBQWxDLEVBQS9CLHdOQUpLO0FBS0wsV0FBUSxHQUFSLENBQVksSUFBWixFQUxLO0FBTUwsT0FBSSxLQUFKLENBQVUsT0FBVixFQUFtQixJQUFuQixFQU5LLENBQU47QUFPRyxjQVJKLEVBUWtCLEtBUmxCLENBUXdCLFlBUnhCLEVBVFMsQ0FBVjtBQWtCRyxhQW5CSixFQW1Ca0IsS0FuQmxCLENBbUJ3QixZQW5CeEIsRUFERCxDQURxRixDQUFyRiIsImZpbGUiOiJib3Rfb2xkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15c3FsID0gcmVxdWlyZShcIm15c3FsXCIpO1xudmFyIEJvdGtpdCA9IHJlcXVpcmUoJ2JvdGtpdCcpO1xuXG52YXIgZGIgPSBteXNxbC5jcmVhdGVDb25uZWN0aW9uKHtcbiAgaG9zdCAgICAgOiAnbG9jYWxob3N0JyxcbiAgdXNlciAgICAgOiAncm9vdCcsXG4gIHBhc3N3b3JkIDogJ3Rvb3InLFxuICBkYXRhYmFzZSA6ICdjb2NhdWRib3QnXG59KTtcblxuZGIuY29ubmVjdCgpO1xuXG5mdW5jdGlvbiBkYlF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpXG57XG5cdGNvbnNvbGUubG9nKFwiZGJRdWVyeSA6IFwiK3F1ZXJ5KTtcblx0dmFyIHAgPSAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGRiLnF1ZXJ5KHF1ZXJ5LCBwYXJhbXMsIChlcnIsIHJlc3VsdHMsIGZpZWxkcykgPT4ge1xuXHRcdFx0aWYoIWVycikgcmVzb2x2ZSh7cmVzdWx0cyA6IHJlc3VsdHMsIGZpZWxkcyA6IGZpZWxkc30pO1xuXHRcdFx0ZWxzZSByZWplY3QoZXJyKTtcblx0XHR9KTtcblx0fSk7XG5cdHAuY2F0Y2goZXJyb3JIYW5kbGVyKTtcblx0cmV0dXJuIHBcbn1cblxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVycilcbntcblx0dGhyb3cgZXJyO1xufVxuXG5mdW5jdGlvbiBuZXdVc2VyKHVzZXJJZClcbntcblx0cmV0dXJuIGRiUXVlcnkoXCJJTlNFUlQgSU5UTyBwb2ludHModXNlcl9pZCwgcG9pbnRzKSBWQUxVRVMoID8sIDEpO1wiLCBbdXNlcklkXSlcblx0XHQudGhlbigoKT0+IGNvbnNvbGUubG9nKFwiVW4gbm91dmVsIGFycml2YW50IGRhbnMgbGEgY291cnNlIGF1IHBvaW50IGNvY2F1ZCAhIFtcIit1c2VySWQrXCJdXCIpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VySWQsIG5iUG9pbnRzKVxue1xuXHRyZXR1cm4gZGJRdWVyeShcIlVQREFURSBwb2ludHMgU0VUIHBvaW50cyA9ID8gV0hFUkUgdXNlcl9pZCA9ID87XCIsIFtuYlBvaW50cywgdXNlcklkXSlcblx0XHQudGhlbigoKSA9PiBjb25zb2xlLmxvZyh1c2VySWQrXCIgw6AgZ2FuZ8OpIHVuIHBvaW50ICFcIikpO1xufVxuXG5mdW5jdGlvbiB0b1Byb21pc2UoZnVuLCBwYXJhbSlcbntcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IGZ1bihwYXJhbSwoZXJyLCByZXNwb25zZSkgPT4gIWVyciA/IHJlc29sdmUocmVzcG9uc2UpIDogZXJyb3JIYW5kbGVyKGVycikpKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVVc2VySW5mbyhib3QsIHVzZXIpXG57XG5cdGNvbnNvbGUubG9nKFwicG9wdWxhdGUgdXNlclwiKTtcblx0dmFyIHAgPSB0b1Byb21pc2UoYm90LmFwaS51c2Vycy5pbmZvLCB7dXNlciA6IHVzZXIudXNlcl9pZH0pLnRoZW4oXG5cdFx0KHt1c2VyIDoge25hbWV9fSkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2cobmFtZSk7XG5cdFx0XHR1c2VyLm5hbWUgPSBuYW1lO1xuXHRcdFx0cmV0dXJuIHVzZXI7XG5cdFx0fSwgZXJyb3JIYW5kbGVyKTtcblx0cC5jYXRjaChlcnJvckhhbmRsZXIpO1xuXHRyZXR1cm4gcDtcbn1cblxuXG5cbnZhciBjb250cm9sbGVyID0gQm90a2l0LnNsYWNrYm90KCk7XG52YXIgYm90ID0gY29udHJvbGxlci5zcGF3bih7XG4gIHRva2VuOiBcInhveGItMTkwNTQ0ODIyOTAtbW1tOVZuZ1hqMUxVdjdQbkZ3WmhVakRvXCJcbn0pXG5ib3Quc3RhcnRSVE0oZnVuY3Rpb24oZXJyLGJvdCxwYXlsb2FkKSB7XG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBjb25uZWN0IHRvIFNsYWNrJyk7XG4gIH1cbn0pO1xuXG5jb250cm9sbGVyLm9uKFwiaGVsbG9cIiwgKGJvdCwgbWVzc2FnZSkgPT5cbntcblx0dG9Qcm9taXNlKGJvdC5hcGkuY2hhbm5lbHMubGlzdCwge2V4Y2x1ZGVfYXJjaGl2ZWQgOiB0cnVlfSkudGhlbihcblx0XHQoe2NoYW5uZWxzfSkgPT4ge2ZvcihsZXQgY2hhbm5lbCBvZiBjaGFubmVscykgdG9Qcm9taXNlKGJvdC5hcGkuY2hhbm5lbHMuam9pbix7bmFtZSA6IGNoYW5uZWwubmFtZX0pLnRoZW4oY29uc29sZS5sb2cpfVxuXHQpLmNhdGNoKGVycm9ySGFuZGxlcik7XG59KTtcblxuY29udHJvbGxlci5vbihcInJlYWN0aW9uX2FkZGVkXCIsIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSlcbntcblx0bGV0IGNoYW5uZWwgPSBtZXNzYWdlLml0ZW0uY2hhbm5lbDtcblx0bGV0IG1lc3NhZ2VUaW1lc3RhbXAgPSBtZXNzYWdlLml0ZW0udHM7XG5cblx0dG9Qcm9taXNlKGJvdC5hcGkucmVhY3Rpb25zLmdldCwge2NoYW5uZWwgOiBjaGFubmVsLCB0aW1lc3RhbXAgOiBtZXNzYWdlVGltZXN0YW1wfSlcblx0XHQudGhlbihyZXN1bHQgPT4gcmVzdWx0Lm1lc3NhZ2UudXNlciwgY29uc29sZS5lcnJvcilcblx0XHQudGhlbih1c2VySWQgPT4gZGJRdWVyeShcIlNFTEVDVCBwb2ludHMsIHVzZXJfaWQgRlJPTSBwb2ludHMgV0hFUkUgdXNlcl9pZCA9ID9cIiwgW3VzZXJJZF0pLCBjb25zb2xlLmVycm9yKVxuXHRcdC50aGVuKCh7cmVzdWx0cyA6IFt1c2VyXX0pID0+ICF1c2VyID8gbmV3VXNlcih1c2VyLnVzZXJfSWQpIDogdXBkYXRlVXNlcih1c2VyLnVzZXJfaWQsIHVzZXIucG9pbnRzICsgMSksIGNvbnNvbGUuZXJyb3IpXG5cdFx0LmNhdGNoKGVycm9ySGFuZGxlcik7XG59KTtcblxuY29udHJvbGxlci5oZWFycygnZG9ubmUgbW9pIGxlIGNsYXNzZW1lbnQnLCAnZGlyZWN0X21lc3NhZ2UsZGlyZWN0X21lbnRpb24sIG1lbnRpb24nLGZ1bmN0aW9uKGJvdCxjb21tYW5kKVxue1xuXHRkYlF1ZXJ5KFwiU0VMRUNUIHVzZXJfaWQsIHBvaW50cyBGUk9NIHBvaW50cyBPUkRFUiBCWSBwb2ludHMgREVTQ1wiKS50aGVuKFxuXHRcdHJlc3VsdCA9PiB7XG5cdFx0XHRsZXQgcHJvbWlzZXMgPSBbXTtcblx0XHRcdGxldCB1c2VycyA9IHJlc3VsdC5yZXN1bHRzO1xuXHRcdFx0XG5cdFx0XHRjb25zb2xlLmxvZyhcImJlZm9yZSBmb3JcIik7XG5cblx0XHRcdGZvcihsZXQgdXNlciBvZiB1c2VycykgcHJvbWlzZXMucHVzaChwb3B1bGF0ZVVzZXJJbmZvKGJvdCwgdXNlcikpO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhcImJlZm9yZSBwcm9taXNlXCIpO1xuXHRcdFx0UHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInByb21pc2UgYWxsXCIpO1xuXHRcdFx0XHRcdGxldCB0ZXh0ID0gXCJWb2ljaSBsZSBjbGFzc2VtZW50IDpcXG5cIjtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0ZXh0KTtcblx0XHRcdFx0XHRmb3IobGV0IHVzZXIgb2YgdXNlcnMpIHRleHQgKz0gdXNlci5uYW1lICsgXCIgOiBcIiArIHVzZXIucG9pbnRzICsgXCJcXG5cIjtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0ZXh0KTtcblx0XHRcdFx0XHRib3QucmVwbHkoY29tbWFuZCwgdGV4dCk7XG5cdFx0XHRcdH0sIGVycm9ySGFuZGxlcikuY2F0Y2goZXJyb3JIYW5kbGVyKTtcblx0XHR9LCBlcnJvckhhbmRsZXIpLmNhdGNoKGVycm9ySGFuZGxlcik7XHRcdFxufSk7XG5cblxuIl19
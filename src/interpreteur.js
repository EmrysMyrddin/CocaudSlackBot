"use strict";
import {log, beginWith, endWith} from "./utils.js"

export default class Interpreteur
{
	constructor(slack, db)
	{
		this.slack = slack;
		this.db = db;
	}

	interpreter(rawCommand)
	{
		let command = rawCommand.split(' ');

		if(command.length === 0) return Promise.resolve("Oui ?");

		let fun = command.shift().toLowerCase().trim();
		let params = command;

		try { return this['_i_' + fun](...params); }
		catch(e)
		{
			console.error(e);
			if(e instanceof TypeError) return Promise.resolve(fun + " ? Kézako ?");
			else throw e;
		}

	}

	_i_classement()
	/*Affiche le classement des points cocaud*/
	{
		return this.db.getClassement()
			.then(classement => {
				let text = "Voici le classement :\n";
				for(let {user_id, points} of classement)
					text += this.slack.api.getUserByID(user_id).name + " : " + points + "\n";
				return text;
			});
	}

	_i_give(userTag)
	/* Donne un point cocaud à @user */
	{
		return new Promise(resolve => {
			let userId = this.slack.userFromTag(userTag).id;

			if(!userId) return resolve("Gros débile, donne moi un nom au moins... Comme ça : give @untrouducul");
			else return this.db.givePoint(userId);
		});
	}

	_i_remove(userTag)
	/* Enlève un point cocaud à @user */
	{
		return new Promise(resolve => {
			let userId = this.slack.userFromTag(userTag).id;

			if(!userId) resolve("Gros débile, donne moi un nom au moins... Comme ça : give @untrouducul");
			return this.db.removePoint(userId);
		});
	}

	_i_help()
	/* Affiche l'aide */
	{
		let text = "Tu veux de l'aide ? Voilà ce que je sais faire :\n";
		for(let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
		{
			if(beginWith(key, "_i_"))
			{
				text += "    - " + key.substr(3);
				log(this[key].toString());
				let fn = this[key].toString()
					.match(/^function\s*_i_.*\(\s*(.*)\)\s*(?:\/\*(.*)\*\/)?/m);
				let args = fn[1].split(/\s*,\s*/);
				let description = fn[2]
				for(let a of args) text += a != '' ? " [" + a + "]" : '';
				text += description ? "  : " + description + '\n' : '\n';
			}
		}

		return Promise.resolve(text)
	}
}
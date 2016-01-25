/**
 * Created by valentin on 22/01/16.
 */
"use strict";
import DataBase from "./DataBase.js";
import {Slack} from "./Slack.js";
import Interpreteur from "./interpreteur.js";
import {log, beginWith, endWith} from "./utils.js";

// Error handling of unhandled promise rejections
process.on('unhandledRejection', err => {console.error(err.message); console.error(err.stack);});

var db = new DataBase();
var slack = new Slack();
var interpreteur = new Interpreteur(slack, db);

log("Setting up event listeners");

slack.on([
	["open", () => {
		log("Bot connected.");
	}],
	["raw_message", event => {
		if(!beginWith(event.type, "reaction_")) return; //L'event concerne les réactions
		if(event.item.type !== "message") return; // La réaction concerne un message
		if(!endWith(event.type, "added") && !endWith(event.type, "removed")) return; // Il s'agit d'un ajout ou d'une supression

		console.log("Bot : reaction interaction");
		let user_id;

		slack.getMessage(event.item.channel, event.item.ts)
			.then(({message :{user}}) =>
				endWith(event.type, "added") ? db.givePoint(user) : db.removePoint(user)
			)
			.then(({rows}) => {
				if(rows.length === 0)
					return db.createUser(user_id);
				else if(rows.length === 1)
					return db.updateUser(user_id, rows[0].points + (endWith(event.type, "added") ? 1 : -1));
			})
	}],
	["message", event => {
		let command = slack.directMention(event);
		if(!command) return;
		log("Command received : ", command);

		interpreteur.interpreter(command)
			.then(result => {
				if(result) slack.api.getChannelGroupOrDMByID(event.channel).send(result)
			});
	}]])
	.addErrorHandler(e => {throw e;})
	.login();

debugger;
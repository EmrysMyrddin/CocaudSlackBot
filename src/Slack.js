"use strict";
import SlackClient from 'slack-client';
import {log} from './utils.js';
import 'source-map-support/register';
import properties from "../properties.json";

let userTagPatern = new RegExp("<@(.*)>");

export function userTag(userId)
{
	return "<@" + userId + ">";
}

export function isDirectMessage(message, userId)
{
	return message.substr(0, userTag(userId).length) === userTag(userId);
}

export class Slack
{
	constructor()
	{
		this.api = new SlackClient(
			properties.slack.token,
			properties.slack.autoReconnect,
			properties.slack.autoMark
		);
	}

	on(handlers)
	{
		handlers.forEach(([event, handler]) => this.api.on(event, handler));
		return this;
	}

	login()
	{
		this.api.login();
		return this;
	}

	addErrorHandler(handler)
	{
		this.on([['error', e => {throw e}]]);
		return this;
	}

	// If the event is a direct mention, it return the message after the mention, undefined if not
	directMention(event)
	{
		if(isDirectMessage(event.text, this.api.self.id))
		{
			let messageSplited = event.text.split(':');
			if(messageSplited.length === 2) return messageSplited[1].trim();
		}
	}

	getMessage(channel, ts)
	{
		return new Promise((resolve, reject) => this.api._apiCall(
			"reactions.get",
			{timestamp : ts, channel : channel},
			data => {
				if(data.type !== "message") reject("Ceci n'est pas un message");
				else resolve(data);
			}
		));
	}

	userFromTag(userTag)
	{
		if(!userTag || !userTag.match(userTagPatern)) return;
		else return this.api.getUserByID(userTag.replace(userTagPatern, "$1"));
	};
}

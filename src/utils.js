/**
 * Created by valentin on 22/01/16.
 */
"use strict";

export function log(...params)
{
	return console.log(...params);
}

export function beginWith(string, patern)
{
	if(!patern) return true;
	if(!string) return false;
	return string.substr(0, patern.length) === patern;
}

export function endWith(string, patern)
{
	if(!patern) return true;
	if(!string) return false;
	return string.substr(string.length - patern.length, string.length) === patern;
}
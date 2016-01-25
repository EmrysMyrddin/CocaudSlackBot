/**
 * Created by valentin on 22/01/16.
 */
"use strict";
import mysql from 'mysql';
import slack from 'slack-client';
import {log} from './utils';
import properties from '../properties';

export default class DataBase
{
	constructor()
	{
		this.connection = mysql.createConnection(properties.database);
		this.connection.connect();
	}

	query(sql, param)
	{
		console.log("DataBase.query : ", sql, param);

		return new Promise((resolve, reject) =>
			this.connection.query(sql, param, (err, results, fields) =>
				err ? reject(err) : resolve({rows : results, fields : fields}))
		);
	}

	getClassement()
	{
		return this.query("SELECT user_id, points FROM points ORDER BY points DESC")
			.then(({rows}) => rows);
	}

	getUser(user_id)
	{
		return this.query("SELECT * FROM points WHERE user_id = ?", [user_id]);
	}

	givePoint(user_id)
	{
		return this.getUser(user_id).then(({rows}) =>
			rows.length === 0 ?
				this.createUser(user_id) :
				this.updateUser(user_id, rows[0].points +  1)
		);
	}

	removePoint(user_id)
	{
		return this.getUser(user_id).then(({rows}) =>
			rows.length !== 0 ? this.updateUser(user_id, rows[0].points -  1) : Promise.reject("No user")
		);
	}

	createUser(user_id)
	{
		return this.query("INSERT INTO points(user_id, points) VALUES(?, 1);", [user_id]);
	}

	updateUser(user_id, points)
	{
		return this.query("UPDATE points SET points = ? WHERE user_id = ?", [points, user_id]);
	}
}
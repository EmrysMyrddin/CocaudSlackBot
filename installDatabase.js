"use strict";
/**
 * Created by valentin on 25/01/16.
 */

console.log("Begining of isntallation");

var mysql = require("mysql");
var properties = require("./properties.json");

var db = mysql.createConnection(properties.database);
db.connect();

console.log("Database connection successful");

db.query(
	"CREATE TABLE points(" +
	"id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
	"user_id VARCHAR(20) NOT NULL," +
	"points INT NOT NULL);",
	err =>{
		if(err){
			console.error("Installation failed !\n");
			console.error(err.message);
			console.error(err.stack);
		}
		else console.log("Installation successful !");

		db.end();
	}
);



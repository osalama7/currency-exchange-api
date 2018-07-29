'use strict';

const MongoClient = require('mongodb').MongoClient;
const Config = require('./../config');
const dbConnection = {};

//mutating connection constant to hold connect function as well as connected db object to be used globally
dbConnection.connect = async () => {
	let db = {};
	await MongoClient
			.connect(Config.mongodb.url, {
				poolSize: 10,
				useNewUrlParser: true
			})
			.then( async (connection) => {
				dbConnection.db = await connection.db(Config.mongodb.dbName);
			})
			.catch(err => {
				console.log(`Error conneting to mongodb ${err}`);
			});
};

module.exports.dbConnection = dbConnection;


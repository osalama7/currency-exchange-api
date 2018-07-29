'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const colors = require('colors');
const Config = require('./config');
const MongoAdapter = require('./lib/mongodb-adapter');
const Routes = require('./routes');

let middlewares = [
	compression(),
	bodyParser.json(),
];

const app = new express();
app.use(middlewares);

app.get('/', async (req, res, next) => {
	res.status(200).send('Api up and running welcome to homepage')
});

app.listen(Config.port, async () => {
	app.use('/', Routes);
	await MongoAdapter.dbConnection.connect().catch(err => {
		console.error(err);
	});

	console.log(colors.green(`Currency exchange api running: ${Config.port}`));
});

module.exports = app;
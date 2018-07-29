'use strict';
const express = require('express');
const Router = express.Router();

const colors = require('colors');
const moment = require('moment');
const mongo = require('./lib/mongodb-adapter').dbConnection;
const FileParser = require('./lib/rates-parser');
const CurrencyExchange = require('./lib/get-exchange-rate');

const  RoutePaths  = {
	exchange : {
		GetAllEuroRates: '/currency-rates',
		GetExchangeRate: '/exchange',
	}
};
//request time logger middleware
Router.use(async (req, res, next) => {
	console.log(colors.blue(`Received request at ${moment()}`));
	next();
});

/**
 * Route returning all currency values against Euro§.
 * @name /currency-rates
 * @function
 * @param {string} path - Express path
 * @returns array of currency values
 */
Router.get(RoutePaths.exchange.GetAllEuroRates, async (req, res, next) => {
	let transactionLogCollection = await mongo.db.collection('transaction-log');
	let result = await transactionLogCollection
			.insertMany([{
				request: 'Get All Euro Rates',
				time: moment(),
				success: true
			}])
			.catch((error) => {

		console.error(colors.red(`Failed to insert transaction ${error}`));
		res.status(500).send(`Failed to insert transaction, try again later`);
	});

	await FileParser.getParsedEurRates()
			.then(currencyRates => {

		res.status(200).send(currencyRates);
		next();
	});

});

/**
 * Route returning value of an exchange rate from Euro or To Euro.
 * @name /exchange
 * @function
 * @param {string} path - Express path
 * @param from {string} request body - optional
 * @param to {string} request body - optional
 * @param amount {string} request body - mandatory { default : 1 }
 * @query {string} query optional precision parameter defaults to 4
 * @returns value of exchange rate
 */
Router.post(RoutePaths.exchange.GetExchangeRate, async (req, res, next) => {
	let transactionLogCollection = await mongo.db.collection('transaction-log');

	let result = CurrencyExchange.validateExchangeData(req.body).catch(err => {
		res.status(403).send(`Failed to validate request body`);
	});

	let calculation = {};
	calculation.value = await CurrencyExchange.getExchangeRate(req.body, req.query.p ? req.query.p : 4).catch(err => {
		console.error(err);
	});

	await transactionLogCollection
			.insertMany([{
				request: 'Exchange',
				body: req.body,
				time: moment(),
				result: calculation,
				success: true
			}])
			.catch((error) => {
				console.error(colors.red(`Failed to insert transaction ${error}`));
				res.status(500).send(`Failed to insert transaction`);
			});

	calculation.to = req.body.to;
	calculation.from = req.body.from;
	res.status(200).send(calculation);
	next();
});



module.exports = Router;
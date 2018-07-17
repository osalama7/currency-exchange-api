'use strict';

let exchangeFixtures = require('./fixtures');
const FileParser = require('./rates-parser');
let currencyRates = [];

let validateExchangeData = async (payload) => {
	if (typeof payload.from === 'string' &&
			typeof payload.to === 'string' &&
			typeof parseFloat(payload.amount) === 'number') return true;
	else throw new Error('failed to validate request');
};

//this function will either exchange from EUR or to EUR
let getExchangeRate = async( exchangeRequest ) => {
	//fetch latest currency rates
	currencyRates = await FileParser.getParsedEurRates();
	let amount = parseFloat(exchangeRequest.amount);
	if (exchangeRequest.from === 'EUR') 	return _exchangeFromEuro(exchangeRequest.to, amount, 4);
	else return _exchangeToEuro(exchangeRequest.from, amount, 4);
};

let _getExchangeRate = (currency) => {
	let rate = currencyRates.filter((element) => {
		if (currency === Object.keys(element)[0]) return element;
	});
	//todo can be improved return statement
	return Object.values(rate[0])[0]
};

let _exchangeFromEuro = (currency, amount, precision) => {
	return _getNumberToPrecision( _getExchangeRate(currency) * amount, precision);
};

let _exchangeToEuro = (currency, amount, precision) =>{
 	return _getNumberToPrecision(amount / _getExchangeRate(currency), precision);
};

let _getNumberToPrecision = (num, precision) => {
	return Number(num).toPrecision(precision);
};
module.exports = { validateExchangeData, getExchangeRate };
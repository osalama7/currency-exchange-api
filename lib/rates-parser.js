'use strict';

const csv = require('fast-csv');
const fs = require('fs');
let csvStream = [];

let _readFileContent = (rates) => {
	csvStream = rates;
};

let currencyRates = [];

module.exports.getParsedEurRates = async () => {
	let stream = fs.createReadStream(require('path').resolve(__dirname, './eurofxref.csv'), "utf8");
// csv read in two iterations ( ticks )
	//
// store rates in an array of objects
// if it's a header row store values as keys
// if it's a values row store values as values of the object
	let csvStream = csv()
			.on('data', (row) => {
				row.map( (element, i) => {
					if (!parseFloat(element)) currencyRates[i] = {[element.trim()] : 0};
					else currencyRates[i][Object.keys(currencyRates[i])] = parseFloat(element);
				})

			})
			.on('end', () => {
				currencyRates.shift();
				_readFileContent(currencyRates);
			});

	stream.pipe(csvStream);
	return currencyRates;

};


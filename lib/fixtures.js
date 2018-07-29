'use strict';

let fromEuroToOther = {
	"from": "EUR",
	"to": "USD",
	"amount": 5
};

let fromOtherToEuro = {
	"from": "USD",
	"to": "EUR",
	"amount": "5"
};

let rates =
		[ { EUR: 1 },
			{ USD: 1.172 },
			{ JPY: 131.65 },
			{ BGN: 1.9558 },
			{ CZK: 25.883 },
			{ DKK: 7.4549 },
			{ GBP: 0.8827 },
			{ HUF: 322.14 },
			{ PLN: 4.3013 },
			{ RON: 4.6558 },
			{ SEK: 10.3333 },
			{ CHF: 1.1696 },
			{ ISK: 125.2 },
			{ NOK: 9.479 },
			{ HRK: 7.3945 },
			{ RUB: 72.922 },
			{ TRY: 5.6893 },
			{ AUD: 1.5773 },
			{ BRL: 4.509 },
			{ CAD: 1.5399 },
			{ CNY: 7.8273 },
			{ HKD: 9.1989 },
			{ IDR: 16847.5 },
			{ ILS: 4.265 },
			{ INR: 80.3515 },
			{ KRW: 1320.93 },
			{ MXN: 22.034 },
			{ MYR: 4.7382 },
			{ NZD: 1.7262 },
			{ PHP: 62.691 },
			{ SGD: 1.5954 },
			{ THB: 38.981 },
			{ ZAR: 15.4493 } ];

let currencies = [];
rates.map( (element) => {
	currencies.push(Object.keys(element));
});

module.exports = { fromEuroToOther, fromOtherToEuro, rates, currencies };
'use strict';
if (process.env.NODE_ENV === 'dev') module.exports = {
	"port": 8080,
	"mongodb": {
		"url": "mongodb://localhost:27017",
		"dbName": "currency-exchange-db"
	}
};
else module.exports = {
	"port": 8181,
	"mongodb": {
		"url": "mongodb://localhost:27017",
		"dbName": "currency-exchange-db"
	}
};

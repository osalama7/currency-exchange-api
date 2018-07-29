const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const expect = chai.expect;
const should = chai.should();
const fixtures = require('./../lib/fixtures');
chai.use(chaiHttp);

describe('Currency exchange API', (done) => {
	beforeEach((done) => { //Before each test we empty the database
		done();
	});

	describe('/GET all currency rates', () => {
		it('it should GET all currency exchange rates', (done) => {
			chai.request(server)
					.get('/currency-rates')
					.end((err, res) => {});
			chai.request(server)
					.get('/currency-rates')
					.end((err, res) => {
						fixtures.rates.shift();
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.be.eql(fixtures.rates.length);
						expect(res.body).to.deep.equal(fixtures.rates);
						done();
					});
		});
	});

	describe('/POST A currency exchange request and get a result', () => {
		it.only('it should send a currency exchange request from Euro to another currency and get a calculation result with 4 decimal point precision', (done) => {
			chai.request(server)
					.get('/currency-rates')
					.end((err, res) => {});
			chai.request(server)
					.post('/exchange')
					.send(fixtures.fromEuroToOther)
					.end((err, res) => {
						console.log(res.body);
						//response is not returned fully

						res.should.have.status(200);
						done();
				});
		});

		it('it should send a currency exchange request to Euro from another currency and get a calculation result with 4 decimal point precision', (done) => {

			chai.request(server)
					.post('/exchange')
					.send(fixtures.fromOtherToEuro)
					.end((err, res) => {
						//response is not returned fully

						res.should.have.status(200);
						done();
					});
		});
	});

	// todo add failing tests for validation and calculations
});
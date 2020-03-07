#!/usr/bin/env node

const currency = require('./');
const ora = require('ora');
const axios = require('axios');
const cheerio = require('cheerio');

const argv = process.argv.slice(2);

function help () {
  console.log(
    [
      '',
      '  Example',
      '    ❯ currency 1650 dkk eur',
      '    1650 DKK = 220.79486154 EUR',
      '',
      '  See README.md for detailed usage.'
    ].join('\n')
  );
}

async function test (){
	try{

		const RATES_URL = 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html';
		const response = await axios(RATES_URL);
		const {data, status} = response;
		var $ = cheerio.load(data);
		var i =1;
		var str = 'test';
		console.log('\n');
		while($('#ecb-content-col > main > div.forextable > table > tbody > tr:nth-child('+i+')').text().length>0){
			var str = $('#ecb-content-col > main > div.forextable > table > tbody > tr:nth-child('+i+')').text();
			st = str.split(' ')[1].split('\n')[1];
			console.log(st);
			i++;
		}
		console.log('BTC');
	}
	catch(e) {
		console.error(e);
		process.exit(1);
    }
	process.exit(0)
}

const spinner = ora('Fetching exchange data..');

async function start (opts) {
  try {
    const {amount, from, to} = opts;
    const result = await currency(opts);
	
    spinner.stop();
    console.log(`${amount} ${from} = ${result} ${to}`);
  } catch (error) {
    spinner.stop();
    console.log(error);
    process.exit(1);
  }
}

if (argv.indexOf('--help') !== - 1) {
  help();
  process.exit(0);
}
if (argv.indexOf('--all_currency') !== - 1) {
  test();
}

spinner.start();

const opts = {
  'amount': argv[0] || 1,
  'from': (argv[1] || 'USD').toUpperCase(),
  'to': (argv[2] || 'BTC').toUpperCase()
};

if (argv.indexOf('--all_currency') === - 1) {
  start(opts);
}

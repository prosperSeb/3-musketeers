const nock = require('nock');
const index = require('./index');

beforeEach(() => {
  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=USD')
    .reply(200, {
      'base': 'USD',
      'rates': {
        'EUR': 0.899
      }
    });

  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=EUR')
    .reply(200, {
      'base': 'EUR',
      'rates': {
        'USD': 1.1122
      }
    });

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      'USD': {
        '15m': 8944.49,
        'last': 8944.49,
        'buy': 8944.49,
        'sell': 8944.49,
        'symbol': '$'
      },
      'EUR': {
        '15m': 8048.11,
        'last': 8048.11,
        'buy': 8048.11,
        'sell': 8048.11,
        'symbol': '€'
      }
    });
});

test('convert 1 USD to EUR', async () => {
	const opts = {
		'amount':1,
		'from': ('USD').toUpperCase(),
		'to': ('EUR').toUpperCase()
	};
	const result = await index(opts);
	var num = 0.899;
	expect(result).toBe(num);
});

test('convert 1 USD to USD', async () => {
	const opts = {
		'amount':1,
		'from': ('USD').toUpperCase(),
		'to': ('USD').toUpperCase()
	};
	const result = await index(opts);
	var num = 1;
	expect(result).toBe(num);
});

test('convert 1 EUR to USD', async () => {
	const opts = {
		'amount':1,
		'from': ('EUR').toUpperCase(),
		'to': ('USD').toUpperCase()
	};
	const result = await index(opts);
	var num = 1.1122;
	expect(result).toBe(num);
});
test('convert 1 BTC to USD', async () => {
	const opts = {
		'amount':1,
		'from': ('BTC').toUpperCase(),
		'to': ('USD').toUpperCase()
	};
	const result = await index(opts);
	var num = 8944.49;
	expect(result).toBe(num);
});

test('convert 1 BTC to EUR', async () => {
	const opts = {
		'amount':1,
		'from': ('BTC').toUpperCase(),
		'to': ('EUR').toUpperCase()
	};
	const result = await index(opts);
	var num = 8048.11;
	expect(result).toBe(num);
});

test('convert without arguments', async () => {
	const opts = {
		'amount':1,
		'from': ('USD').toUpperCase(),
		'to': ('BTC').toUpperCase()
	};
	const result = await index(opts);
	var num = 1/8944.49;
	expect(result).toBe(num);
});

test('convert with amount only', async () => {
	const opts = {
		'amount':10,
		'from': ('USD').toUpperCase(),
		'to': ('BTC').toUpperCase()
	};
	const result = await index(opts);
	var num = 10/8944.49;
	
	expect(result.toString().includes(num.toString())).toBe(true);
});

test('convert with amount(10) and (from) currency only(EUR)', async () => {
	const opts = {
		'amount':10,
		'from': ('EUR').toUpperCase(),
		'to': ('BTC').toUpperCase()
	};
	var num = 10/8048.11;
	const result = await index(opts);
	
	expect(result.toString().includes(num.toString())).toBe(true);
});

test('convert without a correct `from` or `to` currency value', async () => {
  const opts = {
		'amount':10,
		'from': ('ERU').toUpperCase(),
		'to': ('ANY').toUpperCase()
	};
	expect(index(opts)).rejects.toEqual(new Error('Please specify a valid `from` and/or `to` currency value!'))
});



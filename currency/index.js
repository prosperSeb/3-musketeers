const axios = require('axios');
const money = require('money');

const RATES_URL = 'https://api.exchangeratesapi.io/latest';
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';

const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN); // check if there is a rate ratio between BTC and the other specified currency return if there is
//console.log(isAnyBTC('BTC','BTC'))
module.exports = async opts => {
  const {amount = 1, from = 'USD', to = "EUR"} = opts;
  const promises = [];
  let base = from;
	
  const anyBTC = isAnyBTC(from, to);
	//console.log(anyBTC);
  if (anyBTC) { // if the user want to convert BTC to any currency this code retunr a promise.
    base = from === CURRENCY_BITCOIN ? to : from;
    promises.push(axios(BLOCKCHAIN_URL));
  }
  
  promises.unshift(axios(`${RATES_URL}?base=${base}`));

  try{
    const responses = await Promise.all(promises);// await until responses get an html reponse with all the rates of currency 
	const [rates] = responses;
	

    money.base = rates.data.base;// define the base currency
    money.rates = rates.data.rates;// fetch an array with all the rates between base and other currency
	

    const conversionOpts = {
      from,
      to
    };
	

    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
		 
      );// blockchain get all the rates between any currency availble and the BTC
	  

      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });// add the rate between ask currency and BTC
	  
	   
    }

    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }//Change conversionOpts to convert BTC

    return money.convert(amount, conversionOpts); //use the money.convert function to return the conversion.
  } catch (error) {
    throw new Error (
      'Please specify a valid `from` and/or `to` currency value!'
    );
  }
};

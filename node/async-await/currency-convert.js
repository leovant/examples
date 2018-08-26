const axios = require('axios');

const fixer_api_key = '7720a755881dcdd2b1c957a7c3628d94';

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${fixer_api_key}&format=1`
    );
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }
    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async currency => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currency}`
    );
    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currency}`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const converted = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${converted} ${to}. You can spend it in the following countries: ${countries.join(
    ', '
  )}.`;
};

// getExchangeRate('USD', 'BRL').then(rate => console.log(rate));

// getCountries('BRL').then(countries => console.log(countries));

convertCurrency('USD', 'CAD', 100)
  .then(message => console.log(message))
  .catch(e => console.error(e.message));

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a)
  .then((results) => {
    console.log(results.address);
    return weather.fetch(results.latitude, results.longitude);
  })
  .then((results) => {
    console.log(`Temperature is ${results.temperature} but it feels like ${results.apparent_temperature}`);
  })
  .catch((error) => {
    console.log(error);
  });

const axios = require('axios'),
      logger = require('../../Winston/WinstonSession'),
      redis = require('../../Redis/RedisSession'),
      WeatherContract = require('../Contracts/WeatherContract'),
      _ = require('lodash'),
      {handleError} = require('./commonFunctions.js');

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

/**
 * Downloads 14 days worth of OpenWeatherMap data into redis server.
 */
function downloadWeather(country, callback) {
  const encodedUri = encodeURI(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${country}&units=metric&cnt=14&apikey=${process.env.OPENWEATHERMAP_API_KEY}`);
  axios.get(encodedUri)
    .then(handleResponse)
    .then(callback)
    .catch(weatherHandleError);
}

function weatherHandleError(err) {
  handleError("Error connecting to OpenWeatherMap.", err);
}

function handleResponse(response) {
  if (response.data.list) {
    persist(response.data.list)
  } else {
    logger.error('Response was empty');
  }
}

function persist(list) {
  const multiRedis = redis.multi();
  _.range(14).forEach(iterator => {
    const date = new Date()
      .addDays(iterator)
      .toDateString();
    const dayForecast = list[iterator];
    multiRedis.HMSET(`Weather:${iterator}`, [
      WeatherContract.DATE, date,
      WeatherContract.MAX, dayForecast.temp.max,
      WeatherContract.MIN, dayForecast.temp.min,
      WeatherContract.PRESSURE, dayForecast.pressure,
      WeatherContract.HUMIDITY, dayForecast.humidity,
      WeatherContract.WEATHER_ID, dayForecast.weather[0].id,
      WeatherContract.WEATHER_DESC, dayForecast.weather[0].description,
      WeatherContract.WEATHER_ICON, dayForecast.weather[0].icon,
      WeatherContract.WIND_SPEED, dayForecast.speed,
      WeatherContract.WIND_DIRECTION, dayForecast.deg
    ]);
  });
  multiRedis.exec((err, res) => {
    if (err) {
      logger.error(`Error persisting day[${iterator}]`);
    }
  });
  logger.info('Weather Data persisted.');
}

module.exports = downloadWeather;

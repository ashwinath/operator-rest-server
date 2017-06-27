const redis = require('../Redis/RedisSession'),
      bluebird = require('bluebird'),
      logger = require('../Winston/WinstonSession'),
      _ = require('lodash');

function getWeather() {
  logger.info("Querying Weather.");
  const queryAll = _.range(14).map(iterator => {
    return redis.hgetallAsync(`Weather:${iterator}`)
  });

  return bluebird.all(queryAll);
}

const WeatherManager = {
  getWeather: getWeather
}

module.exports = WeatherManager;

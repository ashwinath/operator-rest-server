const express = require('express'),
      router = express.Router(),
      WeatherManager = require('../Managers/WeatherManager'),
      logger = require('../../Winston/WinstonSession');

router.get('/', (req, res, next) => {
  logger.info("Weather requested.");
  WeatherManager
    .getWeather()
    .then(allData => {
      res.json(allData);
    })
    .catch(err => {
      logger.error("WeatherManager hit an error", err)
    })
});

module.exports = router;

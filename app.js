const express = require('express'),
      app = express(),
      WeatherManager = require('./Managers/WeatherManager'),
      logger = require('./Winston/WinstonSession');

const PORT = 8080;

app.get('/weather', (req, res) => {
  logger.info("Weather requested.");
  WeatherManager
    .getWeather()
    .then(allData => {
      res.json(allData);
    });
});

const listener = app.listen(PORT, () => {
  logger.info(`Operator Rest Server is listening on port ${PORT}`);
});

module.exports = {
  app: app,
  listener: listener
}

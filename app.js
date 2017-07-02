const express = require('express'),
      app = express(),
      WeatherManager = require('./Managers/WeatherManager'),
      NewsManager = require('./Managers/NewsManager'),
      logger = require('./Winston/WinstonSession');

const PORT = 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/weather', (req, res, next) => {
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

app.get('/news', (req, res, next) => {
  logger.info("News requested");
  NewsManager
    .getAllNews(data => {
      res.json(data);
    });
});

const listener = app.listen(PORT, () => {
  logger.info(`Operator Rest Server is listening on port ${PORT}`);
});

module.exports = {
  app: app,
  listener: listener
}

const express = require('express'),
      app = express(),
      WeatherManager = require('./Managers/WeatherManager'),
      NewsManager = require('./Managers/NewsManager'),
      bodyParser = require('body-parser')
      logger = require('./Winston/WinstonSession');

const PORT = 8080;
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/news/sources', (req, res, next) => {
  logger.info("News sources requested");
  NewsManager.getNewsSources()
    .then(data => {
      res.json({sources: data});
    })
    .catch(err => {
      logger.error("NewsManager hit an error", err);
    });
})

app.get('/news/:source', (req, res, next) => {
  const source = req.params.source;
  logger.info(`News from ${source} requested`);
  NewsManager.getNews(source, result => {
    res.json(result);
  }, err => {
    logger.error(err);
    res.json({error: "No such news source stored."});
  });
})

app.post('/news/sources', (req, res, next) => {
  const source = req.body.source;
  logger.info(`Request to add ${source} into DB.`);
  if (source) {
    NewsManager.addNewsSource(req.body.source, (err, result) => {
      if (err) {
        logger.error("error persisting", err);
        res.json({status: "error persisting"});
      } else {
        res.json({status: "success"});
      }
    });
  } else {
    res.json({status: "error, empty post"});
  }
});

const listener = app.listen(PORT, () => {
  logger.info(`Operator Rest Server is listening on port ${PORT}`);
});

module.exports = {
  app: app,
  listener: listener
}

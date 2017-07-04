const express = require('express'),
      app = express(),
      WeatherRouter = require('./rest-server/Routers/WeatherRouter'),
      NewsRouter = require('./rest-server/Routers/NewsRouter'),
      bodyParser = require('body-parser')
      logger = require('./Winston/WinstonSession'),
      batchServer = require('./batch/batch-process'),
      JobConfig = require('./Config/JobConfig');

const PORT = 8080;
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**************************
 *         ROUTES         *
 **************************/
app.use('/weather', WeatherRouter);
app.use('/news', NewsRouter);

const listener = app.listen(PORT, () => {
  logger.info(`Operator Rest Server is listening on port ${PORT}`);
});

/**************************
 *      BATCH SERVER      *
 **************************/
if (JobConfig.batchSwitch) {
  batchServer();
}

module.exports = {
  app: app,
  listener: listener
}

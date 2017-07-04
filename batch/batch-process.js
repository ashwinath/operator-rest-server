const schedule = require('node-schedule'),
      downloadWeather = require('./Services/WeatherService'),
      downloadNews = require('./Services/NewsServices'),
      NewsContract = require('./Contracts/NewsContract'),
      JobConfig = require('../Config/JobConfig'),
      logger = require('../Winston/WinstonSession');

logger.info("Operator Batch has started.");

function startBatch() {
  /**
   * Weather Job
   */
  schedule.scheduleJob(JobConfig.weather.cron, () => {
    logger.info("Job for Weather started.");
    downloadWeather(JobConfig.weather.country);
  });

  /**
   * News Jobs
   */
  schedule.scheduleJob(JobConfig.news.cron, () => {
    logger.info(`Job for News started.`);
    downloadNews();
  });
}

module.exports = startBatch;

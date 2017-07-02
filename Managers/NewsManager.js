const redis = require('../Redis/RedisSession'),
      bluebird = require('bluebird'),
      logger = require('../Winston/WinstonSession'),
      _ = require('lodash');

const NEWS_SOURCE = [
  'bbc-news',
  'bloomberg',
  'business-insider',
  'reuters',
  'techcrunch'
];

function getAllNews(callback) {
  logger.info("Querying News.");
  const queryAllCounter = NEWS_SOURCE.map(source => `News:${source}`)
    .map(source => {
      return redis.getAsync(`${source}:COUNTER`)
    });
  // all the counters here like ["1", "2", ...]
  return bluebird.all(queryAllCounter)
    .then(data => {
      const redisNewsSources = NEWS_SOURCE.map(source => `News:${source}`)
      let promises = [];
      _.range(NEWS_SOURCE.length).forEach(iterator => {
        const redisNewsSource = redisNewsSources[iterator];
        const redisNewsSourceCounter = data[iterator];
        _.range(redisNewsSourceCounter).forEach(counterNumber => {
          const redisQueryString = `${redisNewsSource}:${counterNumber}`;
          promises.push(redis.hgetallAsync(redisQueryString));
        });
      });
      bluebird.all(promises)
        .then(data => {
          data.sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          })
          return data;
        })
        .then(callback)
        .catch(err => {
          logger.error("NewsManager hit an error", err);
        })
    });
}

const NewsManager = {
  getAllNews: getAllNews
}
module.exports = NewsManager;

const redis = require('../Redis/RedisSession'),
      bluebird = require('bluebird'),
      logger = require('../Winston/WinstonSession'),
      _ = require('lodash');

function addNewsSource(source, callback) {
  redis.SADD('News:SOURCES', source, callback);
}

function getNewsSources() {
  return redis.sortAsync("News:SOURCES", "ALPHA");
}

function getNews(source, callback, errorCallback) {
  redis.getAsync(`News:${source}:COUNTER`)
    .then(counter => {
      const redisMulti = redis.multi();
      _.range(counter).forEach(iterator => {
        redisMulti.hgetall(`News:${source}:${iterator}`);
      })
      redisMulti.exec((err, result) => {
        if (err) {
          errorCallback(err);
        } else {
          callback(result)
        }
      });
    })
    .catch(errorCallback);
}

const NewsManager = {
  getNews: getNews,
  getNewsSources: getNewsSources,
  addNewsSource: addNewsSource
}
module.exports = NewsManager;

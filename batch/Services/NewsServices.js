const axios = require('axios'),
      redis = require('../../Redis/RedisSession'),
      {handleError} = require('./commonFunctions'),
      _ = require('lodash'),
      NewsContract = require('../Contracts/NewsContract'),
      logger = require('../../Winston/WinstonSession');

function genQueryString(source) {
  return encodeURI(`https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=${process.env.NEWSAPI_API_KEY}`);
}

function downloadNews(callback) {
  redis.SMEMBERS(`News:${NewsContract.SOURCES}`, (err, results) => {
    if (err) {
      logger.error("Error getting news sources from db" , err);
    } else {
      results.forEach(source => {
        downloadNewsFromOneSource(source, callback);
      });
    }
  });
}

function downloadNewsFromOneSource(source, callback) {
  logger.info(`Downloading news source from ${source}`);
  const queryString = genQueryString(source);
  axios.get(queryString)
    .then(response => {
      handleResponse(response, source);
    })
    .then(callback)
    .catch((err) => {
      handleNewsError(err, source);
    });
}

function handleNewsError(err, source) {
  handleError(`Error connecting to News API for ${source}.`, err);
}

function handleResponse(response, source) {
  if (response.data.articles) {
    persist(response.data.articles, source);
  } else {
    logger.error(`Response for ${source} was empty.`);
  }
}

function persist(articles, source) {
  logger.info(`Persisting News Data for ${source}.`);
  const counter = articles.length;
  const multiRedis = redis.multi();
  multiRedis.set(`News:${source}:${NewsContract.COUNTER}`, counter);
  _.range(counter).forEach(iterator => {
    const article = articles[iterator];
    multiRedis.HMSET(`News:${source}:${iterator}`, [
      NewsContract.AUTHOR, article.author,
      NewsContract.TITLE, article.title,
      NewsContract.DESC, article.description,
      NewsContract.URL, article.url,
      NewsContract.URL_TO_IMG, article.urlToImage,
      NewsContract.PUBLISH_DATE, article.publishedAt,
    ]);
  });
  multiRedis.exec((err, results) => {
    if (err) {
      logger.error(`Error persisting News for ${source}.`, err);
    }
  });
}

module.exports = {
  downloadNews: downloadNews,
  downloadNewsFromOneSource: downloadNewsFromOneSource
};

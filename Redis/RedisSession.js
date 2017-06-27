const redis = require('redis'),
      client = redis.createClient(),
      bluebird = require('bluebird'),
      logger = require('../Winston/WinstonSession');

client.on("error", err => {
  logger.error(err);
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client;

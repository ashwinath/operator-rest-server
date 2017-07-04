const downloadNews = require('../batch/Services/NewsServices'),
      redis = require('../Redis/RedisSession'),
      NewsContract = require('../batch/Contracts/NewsContract');

jest.autoMockOff();

afterAll(() => {
  redis.quit();
});

describe('Test downloading news api', () => {
  it(`will download the news`, done => {
    redis.SADD(`News:${NewsContract.SOURCES}`, ["techcrunch", 
      "bloomberg", 
      "business-insider",
      "bbc-news",
      "reuters"], (err, result) => {
        downloadNews(() => {
          redis.SMEMBERS(`News:${NewsContract.SOURCES}`, 
            (err, results) => {
            results.forEach(source => {
              testNewsDownload(source, done);
            });
          });
        });
      })
  });
});

function testNewsDownload(source, done) {
  getCounter(source, (err, response) => {
    redis.HGETALL(`News:${source}:${response - 1}`,
      (err, response) => {
      expect(response).toBeTruthy();
      expect(response[NewsContract.AUTHOR]).toBeTruthy();
      expect(response[NewsContract.TITLE]).toBeTruthy();
      expect(response[NewsContract.DESC]).toBeTruthy();
      expect(response[NewsContract.URL]).toBeTruthy();
      expect(response[NewsContract.URL_TO_IMG]).toBeTruthy();
      expect(response[NewsContract.PUBLISH_DATE]).toBeTruthy();
      done();
    });
  });
}

function getCounter(source, callback) {
  redis.GET(`News:${source}:${NewsContract.COUNTER}`, callback);
}

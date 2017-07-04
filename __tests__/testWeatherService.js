const downloadWeather = require('../batch/Services/WeatherService'),
      _ = require('lodash'),
      JobConfig = require('../Config/JobConfig'),
      redis = require('../Redis/RedisSession');

jest.autoMockOff();

afterAll(() => {
  redis.quit();
});

describe('Test downloading weather api', () => {

  it('will download the weather and check lower bound for persistence', done => {
    downloadWeather(JobConfig.weather.country, () => {
      redis.HGETALL("Weather:0", (err, results) => {
        expect(results).toBeTruthy();
        done()
      });
    });
  });

  it('will download the weather and check upper bound for persistence', done => {
    downloadWeather(JobConfig.weather.country, () => {
      redis.HGETALL("Weather:13", (err, results) => {
        expect(results).toBeTruthy();
        done()
      });
    });
  });
});

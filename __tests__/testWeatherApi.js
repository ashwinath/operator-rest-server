const { app, listener } = require('../app'),
      redis = require('../Redis/RedisSession'),
      request = require('supertest');

afterAll(() => {
  redis.quit();
  listener.close();
});

const WEATHER_ENTRY_COUNT = 14;

describe('Weather tests', () => {

  test('GET /weather should respond with json', done => {
    request(app)
      .get("/weather")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(WEATHER_ENTRY_COUNT);
        response.body.forEach(entry => {
          expect(entry.DATE).toBeTruthy();
          expect(entry.MAX).toBeTruthy();
          expect(entry.MIN).toBeTruthy();
          expect(entry.PRESSURE).toBeTruthy();
          expect(entry.HUMIDITY).toBeTruthy();
          expect(entry.WEATHER_ID).toBeTruthy();
          expect(entry.WEATHER_DESC).toBeTruthy();
          expect(entry.WEATHER_ICON).toBeTruthy();
          expect(entry.WIND_SPEED).toBeTruthy();
          expect(entry.WIND_DIRECTION).toBeTruthy();
        })
        done();
      });
  });

  test('GET / should respond with 404 not found', done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

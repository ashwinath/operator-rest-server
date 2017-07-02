const { app, listener } = require('../app'),
      redis = require('../Redis/RedisSession'),
      request = require('supertest');

afterAll(() => {
  redis.quit();
  listener.close();
});

describe('Weather tests', () => {

  test('GET /weather should respond with json', done => {
    request(app)
      .get("/news")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });

});

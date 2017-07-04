const { app, listener } = require('../app'),
      redis = require('../Redis/RedisSession'),
      request = require('supertest');

afterAll(() => {
  redis.quit();
  listener.close();
});

describe('Weather tests', () => {

  test('GET /news/sources should respond with json', done => {
    request(app)
      .get("/news/sources")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });

  test('GET /news/techcrunch should respond with 200', done => {
    request(app)
      .get("/news/techcrunch")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });

  test('POST /news should respond with 200', done => {
    request(app)
      .post("/news/sources", { source: 'financial-times' })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        done();
      });
  });
});

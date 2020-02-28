const server = require('./server.js');
const request = require('supertest');

describe('server', () => {
  describe('GET /', () => {
    it('should return 200 status', function() {
      return request(server).get('/')
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it('should return JSON', function() {
      return request(server).get('/')
        .then(res => {
          expect(res.type).toMatch(/json/)
        })
    })

    it('should have the correct body', function() {
      return request(server).get('/')
        .then(res => {
          expect(res.body.server).toBe('Up and running!  Let\'s write some tests!')
        })
    })

    it('has process.env.DB_ENV as "testing"', () => {
      expect(process.env.DB_ENV).toBe('testing');
    })

    it('should return json in response to GET /api/jokes', () => {
      return request(server).get('/api/jokes')
        .then(res => {
          expect(res.type).toMatch(/json/)
        })
    })

    it('should return 400 in response to GET /api/jokes', () => {
      return request(server).get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(400);
        })
    })

    it('should display error message in response to GET /api/jokes', () => {
      return request(server).get('/api/jokes')
        .then(res => {
          expect(res.body.message).toBe('No credentials!');
        })
    })
  });

  // describe('POST /', () => {
  //   it('should return error message', function () {
  //     return request(server).post('/api/auth/login')
  //       .then(res => {
  //         expect(res.body.message).toBe('Invalid credentials!')
  //       })
  //   })
  // })

})


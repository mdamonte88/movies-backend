var expect = require('chai').expect
  , supertest = require('supertest')
  , mongoose = require('mongoose')
  , app = require('../app')

var MovieModel = require('../models/movie');
var agent = supertest(app);

const name = 'La vida es bella';
const date = '01-01-2020';

describe('movies', function () {
  after(function(done) {
    MovieModel.deleteMany({})
      .then(function () {
        done()
      });
  });

  describe('POST /movies', function () {
    it('shows movies form', function (done) {
      agent
        .post('/api/movies') 
        .type('form')
        .send({
          name,
          date
        })
        .expect(function (res) {
          MovieModel.findOne({}).then(function(movie) {
            expect(movie.name).to.equal(name);
            expect(new Date(movie.date).getTime()).to.equal(new Date(date).getTime());
          });
        })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /movies', function () {
    it('shows movies form', function (done) {
      agent
        .get('/api/movies')
        .expect(function (res) {
          var json = JSON.parse(res.text)
          expect(json.movies).to.be.an('array')
        })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});

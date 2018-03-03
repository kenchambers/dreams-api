// userModel.spec.js

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var knex = require('knex')(require('../knexfile'));

var User = require('../models/user');

describe('User Route', function() {
  beforeEach(function(done) {
    return knex.migrate.rollback()
      .then(function() {
        return knex.migrate.latest()
      })
      .then(function() {
        done();
      });
  });

  after(function (done) {
    return knex.migrate.rollback()
      .then(function(){
        done();
      });
  });



  it('should not have any models', function (done) {
      User.forge().fetch().then(function(results){
        expect(results).to.equal(null);
        done()
      });
    });

    it('should save a model to the database', function (done) {
      var user = new User({
        email: 'test@test.com',
        password: 'defconbravo',
        name: 'Yossarian'
      }).save()
      .then(function(){
        return User.where({email: 'test@test.com'}).fetch();
      })
      .then(function(user){
        expect(user.get('name')).to.equal('Yossarian');
        done();
      });
    });



});

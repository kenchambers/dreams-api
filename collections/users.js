var Bookshelf = require('../bookshelf');
var User = require('../models/user');

var Users = Bookshelf.Collection.extend({
  model: User
});

module.exports = Bookshelf.collection('Users', Users);

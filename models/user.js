
var Bookshelf = require('../bookshelf')
// user.js

var User = Bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = Bookshelf.model('User', User);

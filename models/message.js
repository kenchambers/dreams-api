
var Bookshelf = require('../bookshelf')
// user.js


var Message = Bookshelf.Model.extend({

  tableName: 'messages'

});

module.exports = Bookshelf.model('Message', Message);

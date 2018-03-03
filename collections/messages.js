var Bookshelf = require('../bookshelf');
var Message = require('../models/message');

var Messages = Bookshelf.Collection.extend({
  model: Message
});

module.exports = Bookshelf.collection('Messages', Messages);

const uuid = require('uuid');
var actionTypes = require('../config');
// const store = require('./store');
const Message = require('../models/message');
const Controller = require('./base-controller');

module.exports = class Messages extends Controller {
  constructor() {
    super({
      model: Message
    });
  }
  onMessageAdded({ io, socket, data }) {
    const event = 'messageAdded';
    let attributes = {
      body: data.data.text,
      user: 'balls'
    };

    const params = {
      io,
      socket,
      attributes,
      event
    };
    // NOTE: calling create on the base controller
    this.create(params);
  }
};

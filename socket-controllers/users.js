const uuid = require('uuid');
var actionTypes = require('../config');
// const store = require('./store');
const User = require('../models/user');
const Controller = require('./base-controller');
const UserHelper = require('../util/user-helper');

module.exports = class Users extends Controller {
  constructor() {
    super({
      model: User
    });
  }

  onDisconnect({ io, socket, data }) {
    // console.log('----------------');
    // console.log(io, socket, data);
    // console.log('----------------');
  }

  onUserAdded({ io, socket, data }) {
    const { salt, hash } = UserHelper.saltHashPassword(data.data.password);

    const event = 'newUserAdded';
    let attributes = {
      salt,
      encrypted_password: hash,
      email: data.data.email
    };

    const params = {
      io,
      event,
      socket,
      attributes
    };
    // NOTE: calling create on the base controller
    this.create(params);
  }
};

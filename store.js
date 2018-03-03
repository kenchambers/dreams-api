const crypto = require('crypto')
const uuid = require('uuid')

var bookshelf = require('./bookshelf')
var Message = require("./models/message")

const knex = require('knex')(require('./knexfile'));

module.exports = {
  saltHashPassword,
  createUser ({ email, password }) {
    // console.log(`Add user ${email}`)
    const { salt, hash } = saltHashPassword(password)
    return knex('users').insert({
      salt,
      encrypted_password: hash,
      email
    })
  }

}

module.exports = {
  createMessage ({ user,body }) {
    // console.log('add user', user, body);
    let id = uuid()
    var bob = new Message({id: id});
  }
}

function saltHashPassword (password) {
  const salt = randomString()
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}
function randomString () {
  return crypto.randomBytes(4).toString('hex')
}

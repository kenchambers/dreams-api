'use strict'

// Set up knex using the config file for the environment
var knex = require('knex')(require('./knexfile'))

// set up bookshelf using the knex setup we created above
var Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('registry');

// make sure bookshelf is available when importing this file
module.exports = Bookshelf

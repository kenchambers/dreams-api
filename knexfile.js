
// knexfile.js
var db = (process.env.NODE_ENV === 'test') ? 'dreams_test' : 'dreams';

module.exports = {

  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'jiggalo',
    database: db,
    charset: 'utf8'
  },
  useNullAsDefault: true,

  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};

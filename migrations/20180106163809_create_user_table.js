
exports.up = function (knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id').primary()
    t.string('first_name')
    t.string('last_name')
    t.string('password').notNullable()
    t.string('email').notNullable()
    t.string('profile_img')
    t.timestamps(false, true)
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}

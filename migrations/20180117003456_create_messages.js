
exports.up = function (knex) {
  return knex.schema.createTable('messages', function (t) {
    t.increments('id').primary()
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.string('user').notNull();
    t.string('body').notNull();
    t.timestamps(false, true)
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}

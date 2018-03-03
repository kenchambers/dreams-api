
exports.up = function (knex) {
  return knex.schema.createTable('actions', function (t) {
    t.increments('id').primary()
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.string('user').notNull();
    t.integer('actionType').notNull();
    t.timestamps(false, true)
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}

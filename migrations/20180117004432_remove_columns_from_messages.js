exports.up = function(knex, Promise) {
    return knex.schema.table('messages', function(t) {
        t.dropColumn('createdAt');
        t.dropColumn('updatedAt');

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('messages', function(t) {
      t.dateTime('createdAt').notNull();
      t.dateTime('updatedAt').nullable();
    });
};

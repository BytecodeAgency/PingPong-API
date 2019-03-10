const createPlayersTable = (table, knex) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.integer('teamid').notNullable();
    table.date('timecreated').defaultTo(knex.fn.now());
}

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('players', table => createPlayersTable(table, knex)),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('players'),
    ]);
};

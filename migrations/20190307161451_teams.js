const createTeamsTable = (table, knex) => {
    table.increments('id');
    table.string('name').notNullable().unique();
    table.string('invitecode');
    table.date('timecreated').defaultTo(knex.fn.now());
};

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('teams', table => createTeamsTable(table, knex)),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('teams'),
    ]);
};

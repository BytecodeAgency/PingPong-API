const createGamesPlayedTable = (table, knex) => {
    table.increments('id');
    table.integer('teamid').notNullable().references('id').inTable('teams');
    table.integer('player1id').notNullable().references('id').inTable('players');
    table.integer('player1score').notNullable();
    table.integer('player2id').notNullable().references('id').inTable('players');
    table.integer('player2score').notNullable();
    table.integer('winner').notNullable().references('id').inTable('players');
    table.integer('addedby').notNullable().references('id').inTable('players');
    table.date('playedon').defaultTo(knex.fn.now());
};

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('gamesplayed', table => createGamesPlayedTable(table, knex)),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('gamesplayed'),
    ]);
};

import knex from 'knex';
const knexfile = require('../knexfile.js');

const db = knex(knexfile.test);

export default db;


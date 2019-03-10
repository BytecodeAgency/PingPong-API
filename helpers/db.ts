import knex from 'knex';
const knexfile = require('../knexfile.js');

const db = knex(knexfile.development);

export default db;


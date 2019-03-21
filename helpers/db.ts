import knex from 'knex';
const knexfile = require('../knexfile.js');

const nodeEnv = process.env.NODE_ENV;
const knexfileForEnv = knexfile[nodeEnv || 'development'];
const db = knex(knexfileForEnv);

export default db;


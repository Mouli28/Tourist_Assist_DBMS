const { Pool } = require('pg');
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:postgres@localhost:5432/postgres');

module.exports = db;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

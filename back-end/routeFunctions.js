const db = require('./db');

async function findRoute(start, end) {
    try {
        const query = `SELECT * FROM find_shortest_path($$ 
            SELECT gid AS id, source, target, length AS cost FROM roads
            $$, ${start}, ${end}, false, false);`;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    module.exports = { findRoute };
    
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'medium',
  password: 'password123',
  port: 5432,
});

const getAuthors = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM authors LIMIT 5', (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })
    }) 
}
  
module.exports = {
    getAuthors,
}
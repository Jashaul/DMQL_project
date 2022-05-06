var moment = require('moment');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medium',
  password: 'password123',
  port: 5432,
});

const getAuthors = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT authors.author_id, authors.author, authors.join_date, author_trend.clap_sum, author_trend.response_sum, author_trend.read_time_sum FROM authors LEFT JOIN author_trend ON authors.author_id = author_trend.author_id;', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    }) 
}

const createAuthor = (body) => {
    return new Promise(function(resolve, reject) {
        const { authorName } = body
        pool.query('INSERT INTO authors(author, join_date) VALUES ($1, $2) RETURNING *;', [authorName, moment().format("YYYY-MM-DD")], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new author has been added`)
        })
    })
}

const updateAuthor = (body) => {
    return new Promise(function(resolve, reject) {
        const { authorName, author_id } = body
        pool.query('UPDATE authors SET author=$1 WHERE author_id=$2;', [authorName, author_id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Updated author`)
        })
    })
}

const deleteAuthor = (val) => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(val)
        pool.query(`DELETE FROM authors WHERE author_id=$1;`, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Author deleted with ID: ${id}`)
        })
    })
}
  
module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
}
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
        pool.query('SELECT authors.author_id, authors.author, authors.join_date, author_trend.clap_sum, author_trend.response_sum, author_trend.read_time_sum FROM authors, author_trend WHERE authors.author_id = author_trend.author_id;', (error, results) => {
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
        pool.query('INSERT INTO authors(author, join_date) VALUES ($1, $2) RETURNING *', [authorName, moment().format("YYYY-MM-DD")], (error, results) => {
            if (error) {
            reject(error)
            }
            resolve(`A new author has been added, added: ${results.rows[0]}`)
        })
    })
  }

const deleteAuthor = () => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM authors WHERE author_id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
        })
    })
}
  
module.exports = {
    getAuthors,
    deleteAuthor,
    createAuthor,
}
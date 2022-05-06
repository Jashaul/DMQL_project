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

const getSites = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT domains.domain_id, domains.domain_name, site_trend.clap_sum, site_trend.response_sum, site_trend.read_time_sum FROM domains LEFT JOIN site_trend ON domains.domain_id = site_trend.domain_id;', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    }) 
}

const getArticles = () => {
    const query = 'SELECT * FROM (SELECT articles.article_id, articles.title, articles.subtitle, articles.url, articles.date_posted, authors.author, domains.domain_name FROM articles, authors, domains WHERE articles.author_id = authors.author_id AND articles.domain_id = domains.domain_id ORDER BY articles.article_id desc LIMIT 50) AS list LEFT JOIN (SELECT article_id, claps, responses, reading_time, tags, prev_mon_topic_rate FROM article_meta) AS meta ON list.article_id = meta.article_id;';
    return new Promise(function(resolve, reject) {
        pool.query(query, (error, results) => {
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

const createSite = (body) => {
    return new Promise(function(resolve, reject) {
        const { domainName } = body
        pool.query('INSERT INTO domains(domain_name) VALUES ($1) RETURNING *;', [domainName], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new site has been added`)
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

const updateSite = (body) => {
    return new Promise(function(resolve, reject) {
        const { domainName, domain_id } = body
        pool.query('UPDATE domains SET domain_name=$1 WHERE domain_id=$2;', [domainName, domain_id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Updated site`)
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

const deleteSite = (val) => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(val)
        pool.query(`DELETE FROM domains WHERE domain_id=$1;`, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Author deleted with ID: ${id}`)
        })
    })
}

const deleteArticle = (val) => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(val)
        pool.query(`DELETE FROM articles WHERE article_id=$1;`, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Author deleted with ID: ${id}`)
        })
    })
}
  
module.exports = {
    getAuthors,
    getSites,
    getArticles,
    createAuthor,
    createSite,
    updateAuthor,
    updateSite,
    deleteAuthor,
    deleteSite,
    deleteArticle,
}
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
    const query = 'SELECT article_id, title, subtitle, url, date_posted, author, domain_name, claps, responses, reading_time, tags, prev_mon_topic_rate FROM (articles natural join authors natural join domains) natural left join article_meta ORDER BY article_id desc LIMIT 50;';
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

const createArticle = (body) => {
    return new Promise(function(resolve, reject) {
        const { title, subtitle, url, author, domain_name } = body
        var author_id = null;
        var domain_id = null;
        console.log("here")
        console.log(body)
        pool.query(`SELECT author_id FROM authors WHERE author="${author}";` , (error, results) => {
            if (error) {
                reject(error)
            }
            try {
                console.log(results.rows[0])
                author_id = results.rows[0].author_id;
            } catch (error) {
                reject("Author does not exist")
            }
            pool.query(`SELECT domain_id FROM domains WHERE domain_name="${domain_name}";` , (error, results) => {
                if (error) {
                    reject(error)
                }
                try {
                    console.log(results)
                    domain_id = results.rows[0].domain_id;
                } catch (error) {
                    reject("Site does not exist")
                }
                console.log([title, subtitle, url, domain_id, author_id, moment().format("YYYY-MM-DD")])
                pool.query('INSERT INTO articles(title, subtitle, url, domain_id, author_id, date_posted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [title, subtitle, url, domain_id, author_id, moment().format("YYYY-MM-DD")], (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(`A new site has been added`)
                })
            })
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

const updateArticle = (body) => {
    return new Promise(function(resolve, reject) {
        const { article_id, title, subtitle, url, author, domain_name } = body
        pool.query('UPDATE articles SET title=$2, subtitle=$3, url=$4, domain_id=$5, author_id=$6  WHERE article_id=$1;', [domainName, domain_id], (error, results) => {
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
    createArticle,
    updateAuthor,
    updateSite,
    updateArticle,
    deleteAuthor,
    deleteSite,
    deleteArticle,
}
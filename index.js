const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

const data_model = require('./data_model')

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/authors', (req, res) => {
    data_model.getAuthors()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/add-authors', (req, res) => {
    data_model.createAuthor(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/authors/:id', (req, res) => {
    data_model.deleteAuthor(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/health', (req, res) => {
    res.status(200).send('Server is running!');
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
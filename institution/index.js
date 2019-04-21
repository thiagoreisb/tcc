require('dotenv').config();
'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = new express();
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST2,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Institution microservice!');
});

app.get('/db', (req, res) => {
    pool.connect(function (err, client, done) {
        if (err) {
            res.send('Cannot connect to db! ' + err);
        }
        client.query('SELECT * FROM person', function (err, result) {
            done();
            if (err) {
                res.send('Cannot retrieve data! ' + err);
            }
            res.send(result.rows);
        })
    });
});

// start server on port 3000
app.listen(3000, () => {
    /* eslint-disable */
    console.log('Server up!');
});

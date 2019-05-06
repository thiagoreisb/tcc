require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./api/db.js');
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Institution microservice!');
});

// Database connection test
app.get('/db', (req, res) => {
    db.exec(
        'select table_schema, table_name from information_schema.tables where table_schema=\'public\';',
        [],
        (err, result) => {
            if (err) {
                res.send('Cannot retrieve data! ' + err);
            }
            res.send(result.rows);
        }
    );
});

// start server on port 3000
app.listen(3000, () => {
    /* eslint-disable */
    console.log('Server up!');
});

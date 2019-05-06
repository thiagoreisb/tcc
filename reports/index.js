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
    res.send('Welcome to the Reports microservice!');
});

app.get('/db', (req, res) => {
    db.exec(
        'select * from report;',
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

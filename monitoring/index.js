require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./repository/db.js');
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.send({'status':'Welcome to the Monitoring microservice!'});
});

app.get('/db', (req, res) => {
    db.exec(
        'select * from contract;',
        [],
        (data) => res.json(data)
    );
});

// start server on port 3000 locally
app.listen(process.env.PORT || 3000, () => {
    /* eslint-disable */
    console.log('Server up!');
});

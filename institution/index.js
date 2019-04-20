'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Institution microservice!');
});

// start server on port 3000
app.listen(3000, () => {
    console.log('Server up!');
});

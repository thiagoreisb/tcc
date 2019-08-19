require('dotenv').config()

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./controllers/apiController');

const app = new express();

// enable CORS for service
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

// routes
require('./routes/generalRoutes')(app, api);
require('./routes/postRoutes')(app, api);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server up!');
});
require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Crud = require('./repository/crud');

const crud = new Crud();
const app = new express();

// enable CORS for service
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
require('./routes/testRoutes')(app);
require('./routes/coordinatorRoutes')(app, crud);
require('./routes/reportRoutes')(app, crud);

// start server on port 3000 locally
app.listen(process.env.PORT || 3000, () => {
    /* eslint-disable */
    console.log('Server up!');
});

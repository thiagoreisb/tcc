require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./repository/db.js');
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
require('./routes/testRoutes')(app, db);
require('./routes/personRoutes')(app, db);

// start server on port 3000 locally
app.listen(process.env.PORT || 3000, () => {
    /* eslint-disable */
    console.log('Server up!');
});

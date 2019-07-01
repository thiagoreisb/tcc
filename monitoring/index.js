require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Crud = require('./repository/crud');
const Read = require('./repository/monitoringRead');

const crud = new Crud();
const read = new Read();
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

// routes
require('./routes/testRoutes')(app);
require('./routes/advisorHistoryRoutes')(app, crud);
require('./routes/attendanceRoutes')(app, crud);
require('./routes/contractRoutes')(app, crud, read);
require('./routes/frequencyRoutes')(app, crud);
require('./routes/monitorHistoryRoutes')(app, crud);
require('./routes/scheduleRoutes')(app, crud, read);

// start server on port 3000 locally
app.listen(process.env.PORT || 3000, () => {
    /* eslint-disable */
    console.log('Server up!');
});

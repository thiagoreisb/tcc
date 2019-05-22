'use strict';

const getTestRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the Reports microservice!'});
    });
};

module.exports = getTestRoutes;
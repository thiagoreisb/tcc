'use strict';

const getPersonRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the Monitoring microservice!'});
    });
};

module.exports = getPersonRoutes;
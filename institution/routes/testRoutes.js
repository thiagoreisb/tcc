'use strict';

const getPersonRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the Institution microservice!'});
    });
};

module.exports = getPersonRoutes;
'use strict';

const generalRoutes = (app, api) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the API!'});
    });

    app.get('/classrooms', (req, res) => {
        api.getFromInstitution(
            '/classroom/all',
            (data) => res.send(data),
            (err) => res.send(err)
        );
    });
};

module.exports = generalRoutes;
'use strict';

const getPersonRoutes = (app, db) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the Institution microservice!'});
    });

    // Database connection test
    app.get('/db', (req, res) => {
        db.exec(
            'select table_schema, table_name from information_schema.tables where table_schema=\'public\';',
            [],
            (data) => res.json(data)
        );
    });
};

module.exports = getPersonRoutes;
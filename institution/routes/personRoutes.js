'use strict';

const Router = require('express');
//const personRepo = require('../repository/personRepository');

const getPersonRoutes = (app, db) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            db.exec(
                'select * from person;',
                [],
                (data) => res.json(data)
            );
        })
        .get('/get/:id', (req, res) => {
            db.exec(
                'select * from person where id = $1;',
                [parseInt(req.params.id)],
                (data) => res.json(data)
            );
        })
        .post('/save', (req, res) => {
            // const person = req.body;
            // const result = personRepo.save(person);
            res.send('todo');
        });
    
    app.use('/person', router);
};

module.exports = getPersonRoutes;
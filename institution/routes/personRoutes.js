'use strict';

const Router = require('express');
const Person = require('../models/person');

const getPersonRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Person, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Person,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Person(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Person(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Person(req.body), (data) => res.send(data));
        });
    
    app.use('/person', router);
};

module.exports = getPersonRoutes;
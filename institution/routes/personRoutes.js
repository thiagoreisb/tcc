'use strict';

const Router = require('express');
const Person = require('../models/person');
const Read = require('../repository/institutionRead');

const read = new Read();

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
        .get('/get/student/:name', (req, res) => {
            read.getPersonByName(req.params.name, true, (data) => res.json(data));
        })
        .get('/get/professor/:name', (req, res) => {
            read.getPersonByName(req.params.name, false, (data) => res.json(data));
        })

        .post('/save', (req, res) => {
            crud.saveNew(new Person(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Person(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(Person, req.params.id, (data) => res.send(data));
        });
    
    app.use('/person', router);
};

module.exports = getPersonRoutes;
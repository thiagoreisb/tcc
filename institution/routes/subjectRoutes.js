'use strict';

const Router = require('express');
const Subject = require('../models/subject');

const getSubjectRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Subject, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Subject,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Subject(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Subject(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(Subject, req.params.id, (data) => res.send(data));
        });
    
    app.use('/subject', router);
};

module.exports = getSubjectRoutes;
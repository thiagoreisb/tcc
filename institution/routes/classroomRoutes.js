'use strict';

const Router = require('express');
const Classroom = require('../models/classroom');

const getClassroomRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Classroom, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Classroom,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Classroom(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Classroom(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(Classroom, req.params.id, (data) => res.send(data));
        });
    
    app.use('/classroom', router);
};

module.exports = getClassroomRoutes;
'use strict';

const Router = require('express');
const Course = require('../models/course');

const getCourseRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Course, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Course,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Course(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Course(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Course(req.body), (data) => res.send(data));
        });
    
    app.use('/course', router);
};

module.exports = getCourseRoutes;
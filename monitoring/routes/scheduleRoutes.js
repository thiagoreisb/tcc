'use strict';

const Router = require('express');
const Schedule = require('../models/schedule');

const getScheduleRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Schedule, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Schedule,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Schedule(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Schedule(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Schedule(req.body), (data) => res.send(data));
        });
    
    app.use('/schedule', router);
};

module.exports = getScheduleRoutes;
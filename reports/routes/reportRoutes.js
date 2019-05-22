'use strict';

const Router = require('express');
const Report = require('../models/report');

const getReportRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Report, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Report,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Report(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Report(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Report(req.body), (data) => res.send(data));
        });
    
    app.use('/report', router);
};

module.exports = getReportRoutes;
'use strict';

const Router = require('express');
const Report = require('../models/report');
const Read = require('../repository/reportsRead');

const read = new Read();

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
        .get('/all/my/:id', (req, res) => {
            read.getMyReportsHistory(req.params.id, (data) => res.json(data));
        })
        .get('/c/:contract_id/my/:person_id', (req, res) => {
            read.getMyReport(req.params.contract_id, req.params.person_id, (data) => res.json(data));
        })

        .post('/save', (req, res) => {
            crud.saveNew(new Report(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Report(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(Report, req.params.id, (data) => res.send(data));
        });
    
    app.use('/report', router);
};

module.exports = getReportRoutes;
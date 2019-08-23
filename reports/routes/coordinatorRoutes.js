'use strict';

const Router = require('express');
const Coordinator = require('../models/coordinator');
const Report = require('../models/coordinator_report');
const Read = require('../repository/reportsRead');

const read = new Read();

const getCoordinatorRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Coordinator, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Coordinator,
                req.params,
                (data) => res.json(data));
        })
        .get('/all/:id', (req, res) => {
            read.getCoordinatorHistory(req.params.id, (data) => res.json(data));
        })
        .get('/all/reports/:id', (req, res) => {
            read.getCoordinatorReportHistory(req.params.id, (data) => res.json(data));
        })
        .get('/actual/:id', (req, res) => {
            read.getActualCoordinatorReport(req.params.id, (data) => res.json(data));
        })

        .post('/save', (req, res) => {
            crud.saveNew(new Coordinator(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Coordinator(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(Coordinator, req.params.id, (data) => res.send(data));
        })
        
        .post('/save/report', (req, res) => {
            crud.saveCoordReport(new Report(req.body), (data) => res.send(data));
        })
        .put('/update/report', (req, res) => {
            crud.updateCoordReport(new Report(req.body), (data) => res.send(data));
        })
        .delete('/delete/report/:advisor/:monitor/:coord', (req, res) => {
            crud.removeCoordReport(req.params.advisor, req.params.monitor, req.params.coord, (data) => res.send(data));
        });
    
    app.use('/coordinator', router);
};

module.exports = getCoordinatorRoutes;
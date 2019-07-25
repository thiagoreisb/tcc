'use strict';

const Router = require('express');
const Coordinator = require('../models/coordinator');
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

        .post('/save', (req, res) => {
            crud.saveNew(new Coordinator(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Coordinator(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Coordinator(req.body), (data) => res.send(data));
        });
    
    app.use('/coordinator', router);
};

module.exports = getCoordinatorRoutes;
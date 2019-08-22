'use strict';

const Router = require('express');
const MonitorHistory = require('../models/monitor_history');

const getMonitorHistoryRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(MonitorHistory, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                MonitorHistory,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new MonitorHistory(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new MonitorHistory(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(MonitorHistory, req.params.id, (data) => res.send(data));
        });
    
    app.use('/monitor', router);
};

module.exports = getMonitorHistoryRoutes;
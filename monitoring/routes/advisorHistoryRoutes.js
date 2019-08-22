'use strict';

const Router = require('express');
const AdvisorHistory = require('../models/advisor_history');

const getAdvisorHistoryRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(AdvisorHistory, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                AdvisorHistory,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new AdvisorHistory(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new AdvisorHistory(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(AdvisorHistory, req.params.id, (data) => res.send(data));
        });
    
    app.use('/advisor', router);
};

module.exports = getAdvisorHistoryRoutes;
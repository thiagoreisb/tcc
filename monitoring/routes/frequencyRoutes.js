'use strict';

const Router = require('express');
const Frequency = require('../models/frequency');

const getFrequencyRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Frequency, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Frequency,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Frequency(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Frequency(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Frequency(req.body), (data) => res.send(data));
        });
    
    app.use('/frequency', router);
};

module.exports = getFrequencyRoutes;
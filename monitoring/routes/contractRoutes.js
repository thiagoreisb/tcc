'use strict';

const Router = require('express');
const Contract = require('../models/contract');

const getContractRoutes = (app, crud, read) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Contract, (data) => res.json(data));
        })
        .get('/all/open', (req, res) => {
            read.getRegularMonitorings((data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Contract,
                req.params,
                (data) => res.json(data));
        })
        .get('/all/my/:id', (req, res) => {
            read.getMyMonitorings(req.params.id, true, (data) => res.json(data));
        })
        .get('/actual/my/:id', (req, res) => {
            read.getMyMonitorings(req.params.id, false, (data) => res.json(data));
        })

        .post('/save', (req, res) => {
            crud.saveNew(new Contract(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Contract(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Contract(req.body), (data) => res.send(data));
        });
    
    app.use('/contract', router);
};

module.exports = getContractRoutes;
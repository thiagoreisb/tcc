'use strict';

const Router = require('express');
const Coordinator = require('../models/coordinator');

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
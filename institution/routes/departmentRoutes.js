'use strict';

const Router = require('express');
const Department = require('../models/department');

const getDepartmentRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Department, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Department,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Department(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Department(req.body), (data) => res.send(data));
        })
        .delete('/delete/:id', (req, res) => {
            crud.remove(Department, req.params.id, (data) => res.send(data));
        });
    
    app.use('/department', router);
};

module.exports = getDepartmentRoutes;
'use strict';

const Router = require('express');
const Attendance = require('../models/attendance');

const getAttendanceRoutes = (app, crud) => {
    const router = new Router();

    router
        .get('/all', (req, res) => {
            crud.getAll(Attendance, (data) => res.json(data));
        })
        .get('/get/:id', (req, res) => {
            crud.getById(
                Attendance,
                req.params,
                (data) => res.json(data));
        })
        .post('/save', (req, res) => {
            crud.saveNew(new Attendance(req.body), (data) => res.send(data));
        })
        .put('/update', (req, res) => {
            crud.update(new Attendance(req.body), (data) => res.send(data));
        })
        .delete('/delete', (req, res) => {
            crud.remove(new Attendance(req.body), (data) => res.send(data));
        });
    
    app.use('/attendance', router);
};

module.exports = getAttendanceRoutes;
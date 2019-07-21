'use strict';

const Router = require('express');
const Attendance = require('../models/attendance');

const getAttendanceRoutes = (app, crud, read) => {
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
        .get('/by/frequency/:id', (req, res) => {
            read.getAttendanceByFrequencyId(req.params.id,(data) => res.json(data));
        })
        .get('/by/schedule/:id', (req, res) => {
            read.getAttendanceByScheduleId(req.params.id,(data) => res.json(data));
        })
        .get('/by/contract/:id', (req, res) => {
            read.getAttendanceByContractId(req.params.id,(data) => res.json(data));
        })
        .get('/by/person/:id', (req, res) => {
            read.getAttendanceByPersonId(req.params.id,(data) => res.json(data));
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
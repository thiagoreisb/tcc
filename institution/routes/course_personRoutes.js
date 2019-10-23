'use strict';

const Router = require('express');
const CoursePerson = require('../models/course_person');

const coursePersonRoutes = (app, crud) => {
    const router = new Router();

    router
        .post('/save', (req, res) => {
            crud.insertData(new CoursePerson(req.body), (data) => res.send(data));
        });
    app.use('/course_person', router);
};

module.exports = coursePersonRoutes;
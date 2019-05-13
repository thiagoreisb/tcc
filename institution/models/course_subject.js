'use strict';

class CourseSubject {
    constructor(id_course, id_subject, start_date, end_date) {
        this.id_course = id_course;
        this.id_subject = id_subject;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

module.exports = CourseSubject;
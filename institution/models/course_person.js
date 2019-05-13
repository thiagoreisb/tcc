'use strict';

class CoursePerson {
    constructor(id_course, id_person, start_date, end_date) {
        this.id_course = id_course;
        this.id_person = id_person;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

module.exports = CoursePerson;
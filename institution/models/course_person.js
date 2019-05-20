'use strict';

const table = 'course_person';

class CoursePerson {
    /**
     * Instantiaties this class
     * @function
     * @param {JSON} CoursePerson 
     */
    constructor(course_person) {
        this.id_course = course_person.id_course;
        this.id_person = course_person.id_person;
        this.start_date = course_person.start_date;
        this.end_date = course_person.end_date;
    }

    /**
     * Returns the table related to this model
     */
    static getTable() {
        return table;
    }

    /**
     * Returns the table related to this model
     */
    getTable(){
        return table;
    }
}

module.exports = CoursePerson;
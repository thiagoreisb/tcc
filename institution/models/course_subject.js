'use strict';

const table = 'course_subject';

class CourseSubject {
    /**
     * Instantiate this class
     * @function
     * @param {JSON} CourseSubject 
     */
    constructor(course_subject) {
        this.id_course = course_subject.id_course;
        this.id_subject = course_subject.id_subject;
        this.start_date = course_subject.start_date;
        this.end_date = course_subject.end_date;
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

module.exports = CourseSubject;
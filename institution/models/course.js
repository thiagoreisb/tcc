'use strict';

const table = 'course';

class Course {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Course 
     */
    constructor(course) {
        this.id = course.id;
        this.name = course.name;
        this.person_id = course.person_id;
        this.department_id = course.department_id;
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

module.exports = Course;
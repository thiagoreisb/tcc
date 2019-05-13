'use strict';

class Course {
    constructor(id, name, person_id, department_id) {
        this.id = id;
        this.name = name;
        this.person_id = person_id;
        this.department_id = department_id;
    }
}

module.exports = Course;
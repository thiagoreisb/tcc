'use strict';

const table = 'subject';

class Subject {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Subject 
     */
    constructor(subject) {
        this.id = subject.id;
        this.name = subject.name;
        this.department_id = subject.department_id;
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

module.exports = Subject;
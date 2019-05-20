'use strict';

const table = 'department';

class Department {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Department 
     */
    constructor(department) {
        this.id = department.id;
        this.name = department.name;
        this.person_id = department.person_id;
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

module.exports = Department;
'use strict';

const table = 'classroom';

class Classroom {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Classroom 
     */
    constructor(classroom) {
        this.id = classroom.id;
        this.name = classroom.name;
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

module.exports = Classroom;
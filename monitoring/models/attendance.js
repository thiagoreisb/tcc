'use strict';

const table = 'attendance';

class Attendance {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Attendance  
     */
    constructor(attendance) {
        this.id = attendance.id;
        this.start = attendance.start;
        this.end = attendance.end;
        this.observation = attendance.observation;
        this.frequency_id = attendance.frequency_id;
        this.person_id = attendance.person_id;
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

module.exports = Attendance;
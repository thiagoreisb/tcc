'use strict';

const table = 'frequency';

class Frequency {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Frequency
     */
    constructor(frequency) {
        this.id = frequency.id;
        this.expected_date = frequency.expected_date;
        this.actual_date = frequency.actual_date;
        this.start = frequency.start;
        this.end = frequency.end;
        this.observation = frequency.observation;
        this.status = frequency.status;
        this.class_id = frequency.class_id;
        this.schedule_id = frequency.schedule_id;
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

module.exports = Frequency;
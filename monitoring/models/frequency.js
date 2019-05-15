'use strict';

class Frequency {
    /**
     * Instantiate this class
     * @function
     * @param {int} id 
     * @param {Date} expected_date 
     * @param {Date} actual_date 
     * @param {string} start 
     * @param {string} end 
     * @param {string} observation 
     * @param {int} status 
     * @param {int} class_id 
     * @param {int} schedule_id 
     */
    constructor(
        id,
        expected_date,
        actual_date,
        start,
        end,
        observation,
        status,
        class_id,
        schedule_id) {
        this.id = id;
        this.expected_date = expected_date;
        this.actual_date = actual_date;
        this.start = start;
        this.end = end;
        this.observation = observation;
        this.status = status;
        this.class_id = class_id;
        this.schedule_id = schedule_id;
    }
}

module.exports = Frequency;
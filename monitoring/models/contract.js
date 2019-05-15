'use strict';

class Contract {
    /**
     * Instantiate this class
     * @function
     * @param {int} id 
     * @param {Date} start_date 
     * @param {Date} end_date 
     * @param {int} situation 
     * @param {boolean} assistance 
     * @param {int} subject_id 
     */
    constructor(id, start_date, end_date, situation, assistance, subject_id) {
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.situation = situation;
        this.assistance = assistance;
        this.subject_id = subject_id;
    }
}

module.exports = Contract;
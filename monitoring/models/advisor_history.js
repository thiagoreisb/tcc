'use strict';

class AdvisorHistory {
    /**
     * Instantiate this class
     * @function
     * @param {int} id 
     * @param {int} person_id 
     * @param {int} contract_id 
     * @param {Date} start 
     */
    constructor(id, person_id, contract_id, start) {
        this.id = id;
        this.person_id = person_id;
        this.contract_id = contract_id;
        this.start = start;
    }
}

module.exports = AdvisorHistory;
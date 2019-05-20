'use strict';

const table = 'contract';

class Contract {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Contract
     */
    constructor(contract) {
        this.id = contract.id;
        this.start_date = contract.start_date;
        this.end_date = contract.end_date;
        this.situation = contract.situation;
        this.assistance = contract.assistance;
        this.subject_id = contract.subject_id;
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

module.exports = Contract;
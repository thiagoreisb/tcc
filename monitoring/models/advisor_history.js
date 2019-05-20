'use strict';

const table = 'advisor_history';

class AdvisorHistory {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} AdvisorHistory
     */
    constructor(advisor_history) {
        this.id = advisor_history.id;
        this.person_id = advisor_history.person_id;
        this.contract_id = advisor_history.contract_id;
        this.start = advisor_history.start;
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

module.exports = AdvisorHistory;
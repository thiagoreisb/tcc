'use strict';

const table = 'monitor_history';

class MonitorHistory {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} MonitorHistory
     */
    constructor(monitor_history) {
        this.id = monitor_history.id;
        this.person_id = monitor_history.person_id;
        this.contract_id = monitor_history.contract_id;
        this.start = monitor_history.start;
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

module.exports = MonitorHistory;
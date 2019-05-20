'use strict';

const table = 'coordinator_report';

class  CoordinatorReport {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} CoordinatorReport
     */
    constructor(coordinator_report) {
        this.advisor_id = coordinator_report.advisor_id;
        this.monitor_id = coordinator_report.monitor_id;
        this.coordinator_id = coordinator_report.coordinator_id;
        this.renew = coordinator_report.renew;
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

module.exports =  CoordinatorReport;
'use strict';

class  CoordinatorReport {
    /**
     * Instantiate this class
     * @function
     * @param {int} advisor_id 
     * @param {int} monitor_id 
     * @param {int} coordinator_id 
     * @param {boolean} renew 
     */
    constructor(advisor_id, monitor_id, coordinator_id, renew) {
        this.advisor_id = advisor_id;
        this.monitor_id = monitor_id;
        this.coordinator_id = coordinator_id;
        this.renew = renew;
    }
}

module.exports =  CoordinatorReport;
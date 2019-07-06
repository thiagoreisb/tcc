'use strict';

const req = require('./requestController');

class ApiController {
    constructor() {
        this.institution = process.env.APP_INSTITUTION;
        this.monitoring = process.env.APP_MONITORING;
        this.reports = process.env.APP_REPORTS;
    }

    /**
     * Returns the GET response of institution resource
     * @param {string} resource Service resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    getFromInstitution(resource) {
        return req.get(this.institution, resource);
    }

    /**
     * Returns the GET response of monitoring resource
     * @param {string} resource Service resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    getFromMonitoring(resource) {
        return req.get(this.monitoring, resource);
    }

    /**
     * Returns the GET response of reports resource
     * @param {string} resource Service resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    getFromReports(resource) {
        return req.get(this.reports, resource);
    }
}

const api = new ApiController();

module.exports = api;
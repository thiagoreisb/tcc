'use strict';

const req = require('./requestController');

class ApiController {
    constructor() {
        this.institution = process.env.APP_INSTITUTION;
        this.monitoring = process.env.APP_MONITORING;
        this.reports = process.env.APP_REPORTS;
        console.log(process.env.APP_MONITORING);
    }

    /**
     * Returns the GET response of institution resource
     * @param {string} resource Service resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    getFromInstitution(resource, cb, err) {
        req.get(this.institution, resource, cb, err);
    }

    /**
     * Returns the GET response of monitoring resource
     * @param {string} resource Service resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    getFromMonitoring(resource, cb, err) {
        req.get(this.monitoring, resource, cb, err);
    }

    /**
     * Returns the GET response of reports resource
     * @param {string} resource Service resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    getFromReports(resource, cb, err) {
        req.get(this.reports, resource, cb, err);
    }
}

const api = new ApiController();

module.exports = api;
'use strict';

const req = require('./requestController');

class ApiController {
    constructor() {
        this.institution = process.env.APP_INSTITUTION;
        this.monitoring = process.env.APP_MONITORING;
        this.reports = process.env.APP_REPORTS;
    }

    //#region GET

    /**
     * Returns the GET response of institution resource
     * @param {string} resource Service resource
     */
    getFromInstitution(resource) {
        return req.get(this.institution, resource);
    }

    /**
     * Returns the GET response of monitoring resource
     * @param {string} resource Service resource
     */
    getFromMonitoring(resource) {
        return req.get(this.monitoring, resource);
    }

    /**
     * Returns the GET response of reports resource
     * @param {string} resource Service resource
     */
    getFromReports(resource) {
        return req.get(this.reports, resource);
    }

    //#endregion
    
    //#region POST

    /**
     * Returns the POST response of institution resource
     * @param {string} resource Service resource
     * @param {object} data Data to be sent
     */
    postInstitution(resource, data) {
        return req.post(this.institution, resource, data);
    }

    /**
     * Returns the POST response of monitoring resource
     * @param {string} resource Service resource
     * @param {object} data Data to be sent
     */
    postMonitoring(resource, data) {
        return req.post(this.monitoring, resource, data);
    }

    /**
     * Returns the POST response of reports resource
     * @param {string} resource Service resource
     * @param {object} data Data to be sent
     */
    postReports(resource, data) {
        return req.post(this.reports, resource, data);
    }

    //#endregion
    
    //#region PUT

    /**
     * Returns the PUT response of institution resource
     * @param {string} resource Service resource
     * @param {object} data Data to be sent
     */
    putInstitution(resource, data) {
        return req.put(this.institution, resource, data);
    }

    /**
     * Returns the PUT response of monitoring resource
     * @param {string} resource Service resource
     * @param {object} data Data to be sent
     */
    putMonitoring(resource, data) {
        return req.put(this.monitoring, resource, data);
    }

    /**
     * Returns the PUT response of reports resource
     * @param {string} resource Service resource
     * @param {object} data Data to be sent
     */
    putReports(resource, data) {
        return req.put(this.reports, resource, data);
    }
    
    //#endregion
    
    //#region DELETE

    /**
     * Returns the DELETE response of institution resource
     * @param {string} resource Service resource
     */
    deleteFromInstitution(resource) {
        return req.delete(this.institution, resource);
    }

    /**
     * Returns the DELETE response of monitoring resource
     * @param {string} resource Service resource
     */
    deleteFromMonitoring(resource) {
        return req.delete(this.monitoring, resource);
    }

    /**
     * Returns the DELETE response of reports resource
     * @param {string} resource Service resource
     */
    deleteFromReports(resource) {
        return req.delete(this.reports, resource);
    }

    //#endregion
}

const api = new ApiController();

module.exports = api;
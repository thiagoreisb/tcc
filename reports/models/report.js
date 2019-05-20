'use strict';

const table = 'report';

class Report {

    /**
     * Instantiates this class
     * @function
     * @param {JSON} Report
     */
    constructor(report) {
        this.id = report.id;
        this.suggestions = report.suggestions,
        this.activities = report.activities,
        this.observation = report.observation,
        this.evaluation = report.evaluation,
        this.renew = report.renew,
        this.responsability = report.responsability,
        this.planning = report.planning,
        this.criativity = report.criativity,
        this.relationship = report.relationship,
        this.autodevelopment = report.autodevelopment,
        this.autocritics = report.autocritics,
        this.sent = report.sent,
        this.person_id = report.person_id,
        this.contract_id = report.contract_id;
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

module.exports = Report;
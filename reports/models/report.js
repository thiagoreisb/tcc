'use strict';

class Report {

    /**
     * Instantiate this class
     * @function
     * @param {int} id 
     * @param {string} suggestions 
     * @param {string} activities 
     * @param {string} observation 
     * @param {int} evaluation 
     * @param {boolean} renew 
     * @param {int} responsability 
     * @param {int} planning 
     * @param {int} criativity 
     * @param {int} relationship 
     * @param {int} autodevelopment 
     * @param {int} autocritics 
     * @param {boolean} sent 
     * @param {int} person_id 
     * @param {int} contract_id 
     */
    constructor(
        id,
        suggestions,
        activities,
        observation,
        evaluation,
        renew,
        responsability,
        planning,
        criativity,
        relationship,
        autodevelopment,
        autocritics,
        sent,
        person_id,
        contract_id) {
        this.id = id;
        this.suggestions = suggestions,
        this.activities = activities,
        this.observation = observation,
        this.evaluation = evaluation,
        this.renew = renew,
        this.responsability = responsability,
        this.planning = planning,
        this.criativity = criativity,
        this.relationship = relationship,
        this.autodevelopment = autodevelopment,
        this.autocritics = autocritics,
        this.sent = sent,
        this.person_id = person_id,
        this.contract_id = contract_id;
    }
}

module.exports = Report;
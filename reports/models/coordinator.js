'use strict';

class Coordinator {
    /**
     * Instantiate this class
     * @param {int} id 
     * @param {string} suggestions 
     * @param {string} activities 
     * @param {string} observation 
     * @param {Date} sent 
     * @param {int} person_id 
     */
    constructor(id, suggestions, activities, observation, sent, person_id) {
        this.id = id;
        this.suggestions = suggestions;
        this.activities = activities;
        this.observation = observation;
        this.sent = sent;
        this.person_id = person_id;
    }
}

module.exports =  Coordinator;
'use strict';

const table = 'coordinator';

class Coordinator {
    /**
     * Instantiates this class
     * @param {JSON} Coordinator
     */
    constructor(coordinator) {
        this.id = coordinator.id;
        this.suggestions = coordinator.suggestions;
        this.activities = coordinator.activities;
        this.observation = coordinator.observation;
        this.sent = coordinator.sent;
        this.person_id = coordinator.person_id;
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

module.exports =  Coordinator;
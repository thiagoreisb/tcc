'use strict';

class Attendance {
    /**
     * Instantiate this class
     * @function
     * @param {int} id 
     * @param {string} start 
     * @param {string} end 
     * @param {string} observation 
     * @param {int} frequency_id 
     * @param {int} person_id 
     */
    constructor(
        id,
        start,
        end,
        observation,
        frequency_id,
        person_id) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.observation = observation;
        this.frequency_id = frequency_id;
        this.person_id = person_id;
    }
}

module.exports = Attendance;
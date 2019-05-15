'use strict';

class Schedule {
    /**
     * Instantiate this class
     * @function
     * @param {int} id 
     * @param {int} week_day 
     * @param {string} start 
     * @param {string} end 
     * @param {string} observation 
     * @param {int} situation 
     * @param {int} activity 
     * @param {int} class_id 
     * @param {int} contract_id 
     */
    constructor(
        id,
        week_day,
        start,
        end,
        observation,
        situation,
        activity,
        class_id,
        contract_id) {
        this.id = id;
        this.week_day = week_day;
        this.start = start;
        this.end = end;
        this.observation = observation;
        this.situation = situation;
        this.activity = activity;
        this.class_id = class_id;
        this.contract_id = contract_id;
    }
}

module.exports = Schedule;
'use strict';

const table = 'schedule';

class Schedule {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Schedule
     */
    constructor(schedule) {
        this.id = schedule.id;
        this.week_day = schedule.week_day;
        this.start = schedule.start;
        this.end = schedule.end;
        this.observation = schedule.observation;
        this.situation = schedule.situation;
        this.activity = schedule.activity;
        this.class_id = schedule.class_id;
        this.contract_id = schedule.contract_id;
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

module.exports = Schedule;
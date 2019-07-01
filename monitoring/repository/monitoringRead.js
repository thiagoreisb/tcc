'use strict';

const db = require('./db');

const REGULAR_SITUATION_NUMBER = 1;

class MonitoringRead {
    getRegularMonitorings(cb) {
        let query = 
                'select * from contract '
            +   'where situation = $1 '
            +   'and current_timestamp between start_date and end_date;';

        db.exec(query,[REGULAR_SITUATION_NUMBER],cb);
    }

    getScheduleFromMonitorings(cb) {
        let query = 
                'select c.subject_id, s.* '
            +   'from contract as c '
            +   'inner join  schedule as s on c.id = s.contract_id '
            +   'where c.situation = $1 '
            +   'and current_timestamp between c.start_date and c.end_date;';

        db.exec(query,[REGULAR_SITUATION_NUMBER],cb);
    }
}

module.exports = MonitoringRead;
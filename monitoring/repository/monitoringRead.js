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

    getMyMonitorings(id, allMonitoring, cb) {
        let query =
                'select c.*, m.person_id monitor_id, a.person_id advisor_id '
            +   'from contract c '
            +   'left join monitor_history m on c.id = m.contract_id '
            +   'left join advisor_history a on c.id = a.contract_id  '
            +   'where (m.person_id = $1 or a.person_id = $1) ';

        let actual =
                'and (CURRENT_DATE between c.start_date and c.end_date '
            +   'or situation in (0, 1)) ';
        
        query += allMonitoring ? '' : actual;

        db.exec(query,[id],cb);
    }
}

module.exports = MonitoringRead;
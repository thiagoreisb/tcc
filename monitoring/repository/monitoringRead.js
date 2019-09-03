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

    getScheduleByContractId(id, cb) {
        let query = 'select * from schedule where contract_id = $1 ';

        db.exec(query,[id],cb);
    }

    getActualSchedule(id, cb) {
        let query =
                'select s.* from schedule s '
            +   'inner join contract c on c.id = s.contract_id '
            +   'left join monitor_history m on c.id = m.contract_id '
            +   'left join advisor_history a on c.id = a.contract_id  '
            +   'where (m.person_id = $1 or a.person_id = $1) '
            +   'and (CURRENT_DATE between c.start_date and c.end_date '
            +   'or c.situation in (0, 1)) ';

        db.exec(query,[id],cb);
    }

    getFrequencyByScheduleId(id, cb) {
        let query = 'select * from frequency where schedule_id = $1 ';

        db.exec(query,[id],cb);
    }

    getFrequencyByContractId(id, cb) {
        let query =
                'select f.* from frequency f '
            +   'inner join  schedule s on s.id = f.schedule_id '
            +   'inner join  contract c on c.id = s.contract_id '
            +   'where c.id = $1 '
            +   'and (CURRENT_DATE between c.start_date and c.end_date or c.situation in (0, 1)) ';

        db.exec(query,[id],cb);
    }

    getFrequencyByPersonId(id, date, cb) {
        let query =
                'select f.* from frequency f '
            +   'inner join  schedule s on s.id = f.schedule_id '
            +   'inner join  contract c on c.id = s.contract_id '
            +   'left join   monitor_history m on c.id = m.contract_id '
            +   'left join   advisor_history a on c.id = a.contract_id '
            +   'where (m.person_id = $1 or a.person_id = $1) '
            +   (date ? 'and EXTRACT(month FROM f.actual_date) = EXTRACT(month FROM $2::DATE) ' : ' ')
            +   'and (CURRENT_DATE between c.start_date and c.end_date or c.situation in (0, 1)) ';

        db.exec(query, date ? [id, date] : [id], cb);
    }

    getAttendanceByFrequencyId(id, cb) {
        let query = 'select * from attendance where frequency_id = $1 ';

        db.exec(query,[id],cb);
    }

    getAttendanceByScheduleId(id, cb) {
        let query =
                'select att.* from attendance att '
            +   'inner join  frequency f on f.id = att.frequency_id '
            +   'inner join  schedule s on s.id = f.schedule_id '
            +   'where s.id = $1 ';

        db.exec(query,[id],cb);
    }

    getAttendanceByContractId(id, cb) {
        let query =
                'select att.* from attendance att '
            +   'inner join  frequency f on f.id = att.frequency_id '
            +   'inner join  schedule s on s.id = f.schedule_id '
            +   'inner join  contract c on c.id = s.contract_id '
            +   'where c.id = $1 '
            +   'and (CURRENT_DATE between c.start_date and c.end_date or c.situation in (0, 1)) ';

        db.exec(query,[id],cb);
    }

    getAttendanceByPersonId(id, date, cb) {
        let query =
                'select att.* from attendance att '
            +   'inner join  frequency f on f.id = att.frequency_id '
            +   'inner join  schedule s on s.id = f.schedule_id '
            +   'inner join  contract c on c.id = s.contract_id '
            +   'left join   monitor_history m on c.id = m.contract_id '
            +   'left join   advisor_history a on c.id = a.contract_id '
            +   'where (m.person_id = $1 or a.person_id = $1) '
            +   (date ? 'and EXTRACT(month FROM f.actual_date) = EXTRACT(month FROM $2::DATE) ' : ' ')
            +   'and (CURRENT_DATE between c.start_date and c.end_date or c.situation in (0, 1)) ';

        db.exec(query, date ? [id, date] : [id], cb);
    }
}

module.exports = MonitoringRead;
'use strict';

const db = require('./db');

class ReportsRead {
    getMyReportsHistory(id, cb) {
        let query = 'select * from report where person_id = $1 ';

        db.exec(query,[id],cb);
    }

    getMyReport(contract_id, person_id, cb) {
        let query = 
                'select '
            +   '    r1.id, '
            +   '    r1.suggestions, '
            +   '    r1.activities, '
            +   '    r1.observation, '
            +   '    r1.evaluation, '
            +   '    r1.renew, '
            +   '    r1.responsability, '
            +   '    r1.planning, '
            +   '    r1.criativity, '
            +   '    r1.relationship, '
            +   '    r1.autodevelopment, '
            +   '    r1.autocritics, '
            +   '    r1.sent, '
            +   '    r1.person_id, '
            +   '    r2.contract_id '
            +   'from (select $1::integer as contract_id) r2 '
            +   'left join report r1 on r1.contract_id = r2.contract_id '
            +   'where (r1.person_id = $2 or r1.person_id is null) ';

        db.exec(query,[contract_id, person_id],cb);
    }

    getCoordinatorHistory(id, cb) {
        let query = 'select * from coordinator where person_id = $1 ';

        db.exec(query,[id],cb);
    }

    getCoordinatorReportHistory(id, cb) {
        let query = 
            'select * from coordinator c '
        +   'inner join coordinator_report cr on c.id = cr.coordinator_id '
        +   'where c.person_id = $1 ';

        db.exec(query,[id],cb);
    }

    getActualCoordinatorReport(id, cb) {
        let query = 
                'select * from coordinator c '
            +   'inner join coordinator_report r on c.id = r.coordinator_id '
            +   'where person_id = $1 and sent is null limit 1 ';

        db.exec(query,[id],cb);
    }
}

module.exports = ReportsRead;
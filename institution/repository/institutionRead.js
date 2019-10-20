'use strict';

const db = require('./db');

const STUDENT_CODE = 0;
const PROFESSOR_CODE = 1;

class InstitutionRead {
    getPersonByName(name, isStudent, cb) {
        let isEmpty = (name === undefined || name === null || name === '');
        let type = isStudent ? STUDENT_CODE : PROFESSOR_CODE;

        let query = 'select * from person where type = ' + type + (isEmpty ? ' ' : ' and name like $1 ');

        db.exec(query,(isEmpty ? [] : ['%' + name + '%']),cb);
    }

    getCourseByPersonId(id, cb) {
        let query = 
                'select c.* from course c inner join course_person cp on c.id = cp.id_course '
            +   'where cp.id_person = $1 order by cp.start_date desc limit 1 ';

        db.exec(query,[id],cb);
    }
}

module.exports = InstitutionRead;
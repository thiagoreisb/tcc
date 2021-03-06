'use strict';

const generalRoutes = (app, api) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the API!'});
    });

    app.get('/courses', (req, res) => {
        api.getFromInstitution('/course/all')
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/classrooms', (req, res) => {
        api.getFromInstitution('/classroom/all')
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/subjects', (req, res) => {
        api.getFromInstitution('/subject/all')
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/schedules', (req, res) => {
        var schedules;
        api.getFromMonitoring('/schedule/all/active')
            .then(data => {
                // Save the data
                schedules = data;

                // Select only the distinct subjects ids
                let subjectsIDs = [...new Set(schedules.status.map(x => x.subject_id))];

                // Makes requests to get the subjects info
                return Promise.all(subjectsIDs.map(id => api.getFromInstitution('/subject/get/' + id)));
            })
            .then(result => {
                // For each schedule, it adds its subject name
                schedules.status.forEach(elem => {
                    elem.subject_name = result.filter(x => {
                        if (x.status[0].id === elem.subject_id) {
                            return x;
                        }
                    })[0].status[0].name;
                });

                res.send(schedules);
            })
            .catch((err) => res.send(err));
    });

    app.get('/monitoring/all/my/:id', (req, res) => {
        api.getFromMonitoring('/contract/all/my/' + req.params.id)
            .then((data) => {
                res.send(data);

                //return Promise.all([]);
            })
            //.then(data => {})
            .catch((err) => res.send(err));
    });

    app.get('/monitoring/actual/my/:id', (req, res) => {
        api.getFromMonitoring('/contract/actual/my/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/schedules/from/contract/:id', (req, res) => {
        api.getFromMonitoring('/schedule/by/contract/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/schedules/from/person/:id', (req, res) => {
        api.getFromMonitoring('/schedule/by/person/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/frequency/from/schedule/:id', (req, res) => {
        api.getFromMonitoring('/frequency/by/schedule/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/frequency/from/contract/:id', (req, res) => {
        api.getFromMonitoring('/frequency/by/contract/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/frequency/from/person/:id', (req, res) => {
        api.getFromMonitoring('/frequency/by/person/' + req.params.id + (req.query.date ? '?date=' + req.query.date : ''))
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/attendance/from/frequency/:id', (req, res) => {
        var attendances;
        var people;
        api.getFromMonitoring('/attendance/by/frequency/' + req.params.id)
            .then((data) => {
                attendances = data;
                people = [...new Set(attendances.status.map(x => x.person_id))];
                return Promise.all(people.map(el => api.getFromInstitution('/person/get/' + el)));
            })
            .then((data) => {
                let peep = [];
                for (let index = 0; index < data.length; index++) {
                    peep.push(data[index].status[0]);
                }
                attendances.status.forEach(el => {
                    el.person_name = peep.filter(p => el.person_id == p.id)[0].name;
                });
                res.send(attendances);
            })
            .catch((err) => res.send(err));
    });

    app.get('/attendance/from/schedule/:id', (req, res) => {
        api.getFromMonitoring('/attendance/by/schedule/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/attendance/from/contract/:id', (req, res) => {
        api.getFromMonitoring('/attendance/by/contract/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/attendance/from/person/:id', (req, res) => {
        var attendances;
        var frequencies;
        var people;
        api.getFromMonitoring('/attendance/by/person/' + req.params.id + (req.query.date ? '?date=' + req.query.date : ''))
            .then((data) => {
                attendances = data;

                frequencies = [...new Set(attendances.status.map(x => x.frequency_id))];
                people = [...new Set(attendances.status.map(x => x.person_id))];
                
                let freqRes = frequencies.map(el => api.getFromMonitoring('/frequency/get/' + el));
                let peoRes = people.map(el => api.getFromInstitution('/person/get/' + el));

                return Promise.all(freqRes.concat(peoRes));
            })
            .then((data) => {
                let freq = [];
                let peep = [];

                for (let index = 0; index < frequencies.length; index++) {
                    freq.push(data[index].status[0]);
                }

                for (let index = frequencies.length; index < frequencies.length + people.length; index++) {
                    peep.push(data[index].status[0]);
                }

                attendances.status.forEach(el => {
                    el.person_name = peep.filter(p => el.person_id == p.id)[0].name;
                    el.actual_date = freq.filter(f => el.frequency_id == f.id)[0].actual_date;
                });
                
                res.send(attendances);
            })
            .catch((err) => res.send(err));
    });

    app.get('/student/:name?', (req, res) => {
        var persons;
        var isEmpty = (req.params.name === undefined || req.params.name === null || req.params.name === '');
        api.getFromInstitution('/person/get/student/q/' + (isEmpty ? '' : req.params.name))
            .then((data) => {
                persons = data;
                
                var ids = [...new Set(data.status.map(x => x.id))];
                
                return Promise.all(ids.map(id => api.getFromMonitoring('/contract/actual/my/' + id)));
            })
            .then((data) => {
                let results = data.filter(f => f.status.length > 0);
                
                persons.status.forEach(el => {
                    for (let index = 0; index < results.length; index++) {
                        const contract = results[index];
                        if (el.id == contract.status[0].monitor_id) {
                            el.contract_id = contract.status[0].id;
                        }
                    }
                });
                res.send(persons);
            })
            .catch((err) => res.send(err));
    });

    app.get('/professor/:name?', (req, res) => {
        var persons;
        var isEmpty = (req.params.name === undefined || req.params.name === null || req.params.name === '');
        api.getFromInstitution('/person/get/professor/q/' + (isEmpty ? '' : req.params.name))
            .then((data) => {
                persons = data;

                var ids = [...new Set(data.status.map(x => x.id))];
                
                return Promise.all(ids.map(id => api.getFromMonitoring('/contract/actual/my/' + id)));
            })
            .then((data) => {
                let results = data.filter(f => f.status.length > 0);
                persons.status.forEach(el => {
                    for (let index = 0; index < results.length; index++) {
                        const contract = results[index];
                        if (el.id == contract.status[0].advisor_id) {
                            el.contract_id = contract.status[0].id;
                        }
                    }
                });
                res.send(persons);
            })
            .catch((err) => res.send(err));
    });

    app.get('/report/all/my/:id', (req, res) => {
        api.getFromReports('/report/all/my/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/report/actual/my/:id', (req, res) => {
        api.getFromMonitoring('/contract/actual/my/' + req.params.id)
            .then((data) => {
                let contract = data.status[0];

                let id = contract === undefined ? 0 : contract.id;

                return api.getFromReports('/report/c/' + id + '/my/' + req.params.id)
            }).then((data) => res.send(data))
            .catch((err) => res.send(err));
    });
};

module.exports = generalRoutes;
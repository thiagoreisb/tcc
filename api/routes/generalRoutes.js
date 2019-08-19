'use strict';

const generalRoutes = (app, api) => {
    app.get('/', (req, res) => {
        res.send({'status':'Welcome to the API!'});
    });

    app.get('/classrooms', (req, res) => {
        api.getFromInstitution('/classroom/all')
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

    /**
     * TODO: Pesquisar nomes de monitor, orientador e disciplina
     * (ver metodo acima)
     */
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
        api.getFromMonitoring('/frequency/by/person/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/attendance/from/frequency/:id', (req, res) => {
        api.getFromMonitoring('/attendance/by/frequency/' + req.params.id)
            .then((data) => res.send(data))
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
        api.getFromMonitoring('/attendance/by/person/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/student/:name', (req, res) => {
        api.getFromInstitution('/person/get/student/' + req.params.name)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/professor/:name', (req, res) => {
        api.getFromInstitution('/person/get/professor/' + req.params.name)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/report/all/my/:id', (req, res) => {
        api.getFromReports('/report/all/my/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });
};

module.exports = generalRoutes;
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

    app.get('/monitoring/all/my/:id', (req, res) => {
        api.getFromMonitoring('/contract/all/my/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });

    app.get('/monitoring/actual/my/:id', (req, res) => {
        api.getFromMonitoring('/contract/actual/my/' + req.params.id)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    });
};

module.exports = generalRoutes;
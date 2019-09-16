'use strict';

const postRoutes = (app, api) => {
    app.post('/new/schedule', (req, res) => {
        var data = {...req.body};

        if (data.person_id !== undefined) {
            api.getFromMonitoring('/contract/actual/my/' + data.person_id)
                .then(r => {
                    let contract = r.status[0].id;

                    if (contract == undefined) {
                        return Promise.resolve(1);
                    } else {
                        data.contract_id = contract;
                        delete data.person_id;

                        return api.postMonitoring('/schedule/save', data);
                    }
                }).then(r => {
                    if (r === 1) {
                        res.send({status: 'err: schedule not created'});
                    } else {
                        res.send(r);
                    }
                }).catch(err => res.send(err))
        } else {
            res.send(data);
        }
    });

    app.post('/new/monitoring', (req, res) => {
        /// Retriving request data
        var start = req.body.start_date;
        var monitor_id = req.body.monitor_id;
        var advisor_id = req.body.advisor_id;
        
        /// It copies the body to prepare data
        var data = {... req.body};
        data.id = 1;
        data.situation = 1;

        /// Auxiliar variables
        var coord_id;
        var coord_report_id;
        var monitor_report_id;
        var advisor_report_id;
        
        Promise.all([
            api.postMonitoring('/contract/save', data),
            api.getFromInstitution('/course/by/student/' + monitor_id)
        ]).then((r) => {
            let id = r[0].status[0].id;

            coord_id = r[1].status[0].person_id;

            let monitor_history = {
                'person_id': monitor_id,
                'contract_id': id,
                'start': start
            }

            let advisor_history = {
                'person_id': advisor_id,
                'contract_id': id,
                'start': start
            }

            let monitor_report = {
                'suggestions': null,
                'activities': null,
                'observation': null,
                'evaluation': null,
                'renew': null,
                'responsability': null,
                'planning': null,
                'criativity': null,
                'relationship': null,
                'autodevelopment': null,
                'autocritics': null,
                'sent': null,
                'person_id': monitor_id,
                'contract_id': id
            }

            let advisor_report = {
                'suggestions': null,
                'activities': null,
                'observation': null,
                'evaluation': null,
                'renew': null,
                'responsability': null,
                'planning': null,
                'criativity': null,
                'relationship': null,
                'autodevelopment': null,
                'autocritics': null,
                'sent': null,
                'person_id': advisor_id,
                'contract_id': id
            }

            return Promise.all([
                api.postMonitoring('/monitor/save', monitor_history),
                api.postMonitoring('/advisor/save', advisor_history),
                api.postReports('/report/save', monitor_report),
                api.postReports('/report/save', advisor_report),
                api.getFromReports('/coordinator/actual/' + coord_id)
            ]);
        }).then((r) => {
            let stat = r[4].status;

            monitor_report_id = r[2].status[0].id
            advisor_report_id = r[3].status[0].id

            // Is there an actual coord report already?
            if (!(Array.isArray(stat) && stat.length)) {
                // No. Create one
                let coord_report = {
                    'suggestions':null,
                    'activities':null,
                    'observation':null,
                    'sent':null,
                    'person_id':coord_id
                }

                return api.postReports('/coordinator/save', coord_report);
            } else {
                // Yes. Jump to next 'then'
                coord_report_id = stat[0].id;

                return Promise.resolve(1);
            }
        }).then((r) => {
            // Check id
            if (coord_report_id === undefined) {
                coord_report_id = r.status[0].id
            }

            let coordinator_report = {
                'advisor_id':advisor_report_id,
                'monitor_id':monitor_report_id,
                'coordinator_id':coord_report_id,
                'renew':null
            }

            return api.postReports('/coordinator/save/report', coordinator_report);
        }).then((r) => res.send(r));
    });
};

module.exports = postRoutes;
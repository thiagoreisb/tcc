'use strict';

const postRoutes = (app, api) => {
    app.post('/new/monitoring', (req, res) => {
        var start = req.body.start_date;
        var end = req.body.end_date;
        var assistance = req.body.assistance;
        var subject_id = req.body.subject_id;
        var monitor_id = req.body.monitor_id;
        var advisor_id = req.body.advisor_id;
        
        /// It copies the body to prepare data
        var data = {... req.body};
        data.id = 1;
        data.situation = 1;

        //var data = {"status": data};

        /// tests
        var p = function(t, i, o) {return new Promise((resolve) => setTimeout(resolve, t, o));}
        var out = {'status':[{'id':100}]}
        var course = {'status':[{'id':100, 'name': 'course 2', 'person_id': 51, 'department_id': 1}]}
        var empty = {'status':[]}
        var coord = {'status':[{'id':10}]}
        var success = {'status':[{'success':1}]}

        var coord_id;
        var coord_report_id;
        var monitor_report_id;
        var advisor_report_id;

        p(100, data, out)//adds contract/termo
            .then((r) => {
                let id = r.status[0].id

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
                    p(10, monitor_history, out),//insert monitor_history
                    p(10, advisor_history, out),//insert advisor_history
                    p(10, monitor_report, out),//insert report for monitor
                    p(500, advisor_report, out),//insert report for advisor
                    p(10, 'course/by/student/' + monitor_id, course)//get course in institution
                ]);
            })
            .then((r) => {
                coord_id = r[4].status[0].person_id
                monitor_report_id = r[2].status[0].id
                advisor_report_id = r[3].status[0].id
                
                return p(100, '/coordinator/actual/' + coord_id, empty)//report -> get if there is a actual coord report
            })
            .then((r) => {
                let stat = r.status;
                
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

                    return p(100, coord_report, coord)
                } else {
                    // Yes. Jump to next then
                    coord_report_id = stat[0].id
                    return p(100, {}, empty)//return empty promise
                }
                //res.send(JSON.stringify(coord_id));
            })
            .then((r) => {
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

                // TODO: Add save coordinator_report method
                return p(100, coordinator_report, success)
            })
            //res.send(r);
        // res.send(data);
        // api.postMonitoring('/contract/save', data)
        //     .then((data) => {
        //         res.send(data);

        //         //return Promise.all([]);
        //     })
        //     .catch((err) => res.send(err));
    });
};

module.exports = postRoutes;
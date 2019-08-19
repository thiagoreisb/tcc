'use strict';

const postRoutes = (app, api) => {
    app.post('/new/monitoring', (req, res) => {
        var start = req.body.start_date;
        var end = req.body.end_date;
        var assistance = req.body.assistance;
        var subject_id = req.body.subject_id;
        var monitor_id = req.body.monitor_id;
        var advisor_id = req.body.advisor_id;

        var data = {"status": {
            "start_date": start,
            "end_date": end,
            "assistance": assistance,
            "subject_id": subject_id,
            "monitor_id": monitor_id,
            "advisor_id": advisor_id
        }};

        res.send(JSON.stringify(data));
    });
};

module.exports = postRoutes;
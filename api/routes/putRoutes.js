'use strict';

const putRoutes = (app, api) => {
    app.put('/update/schedule', (req, res) => {
        var data = {...req.body};

        api.putMonitoring('/schedule/update', data)
            .then(resp => res.send(resp))
            .catch(err => res.send(err));
    });
};

module.exports = putRoutes;
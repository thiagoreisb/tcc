require('dotenv').config({ path: '../.env' })

'use strict';

const axios = require('axios');
const pg = require('pg');

class DB {
    constructor() {
        this.url = process.env.DB_API;

        // Retrieve the database connection string
        axios.get(this.url + '/conn')
            .then((response) => this.pool = new pg.Pool({
                connectionString: response.data,
                ssl: true
            }))
            .catch(function (error) {
                /* eslint-disable */
                if(error.response) {
                    console.log('Response error: ' + error.response.data);
                }
                else if(error.request) {
                    console.log('Request error' + error.response);
                }
                else {
                    console.log('Node.js error: ' + error.message);
                }
                process.exit(0);
            });
    }

    exec(query, params, cb) {
        this.pool.connect(function (err, client, done) {
            if (err) {
                //console.log('Cannot connect to db! ' + err);
            }
            client.query(query, params, function (err, result) {
                done();
                cb(err, result);
            })
        });
    }
}

const db = new DB();

module.exports = db;
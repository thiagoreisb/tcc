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
                /* eslint-enable */
            });
    }

    /**
     * Execute SQL commands
     * @function
     * @param {String} query SQL query to be executed
     * @param {Array<String>} params Parameter values to query with
     * @param {Function} cb Callback function to handle the result
     */
    exec(query, params, cb) {
        this.pool.connect(function (err, client, done) {
            if (err)
                db.send(cb, err);
            else {
                client.query(query, params, function (err, result) {
                    done();
                    db.send(cb, err, result);
                })
            }
        });
    }

    /**
     * Handle the SQL results and responds to request
     * @function
     * @param {*} cb The response callback function
     * @param {*} err The SQL error object
     * @param {*} result The SQL query result
     */
    send(cb, err, result) {
        if (err)
            cb({'status':'error', 'err':err});
        cb(db.getSafe(
            () => {return {'status':result.rows}},
            (e) => {return {'status':'error','err':e}}
        ));
    }

    /**
     * Execute safely a code. It permits to deal with the error.
     * @function
     * @param {Function} fn Function to run safely
     * @param {Function} df Callback function to deal with the error
     */
    getSafe(fn, df) {
        try {
            return fn();
        } catch (e) {
            return df(e);
        }
    }
}

const db = new DB();

module.exports = db;
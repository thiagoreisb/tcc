'use strict';

const db = require('./db');

class Crud {

    /**
     * Return all data from a specific table
     * @function
     * @param {Object} entity Entity to retrieve data
     * @param {function} cb Callback function to handle response data
     */
    getAll(entity, cb) {
        db.exec(
            'select * from ' + entity.getTable() + ';',
            [],
            cb
        );
    }

    /**
     * Return one record by the id
     * @function
     * @param {Object} entity Entity to retrieve data
     * @param {Array} params Array of parameters
     * @param {function} cb Callback function to handle response data
     */
    getById(entity, params, cb) {
        db.exec(
            'select * from ' + entity.getTable() + ' where id = $1;',
            [db.getSafe(() => params.id, () => 0)],
            cb
        );
    }

    /**
     * Saves a new entity
     * @function
     * @param {Object} newRecord Instantiated entity
     * @param {function} cb Callback function
     */
    saveNew(newRecord, cb) {
        let table = newRecord.getTable();
        let props = '';
        let insert = '';
        let count = 1;
        let newValues = [];
        let propsArray = Object.getOwnPropertyNames(newRecord);
        
        /**
         * Iterates over the properties of the object to construct
         * the insert clause and the related values
         */
        propsArray.forEach(
            function(val) {
                if (val !== 'id') {
                    props += '"' + val + '",';
                    insert += '$' + count + ',';
                    count++;
                    newValues.push(newRecord[val] || null);
                }
            }
        );

        // Removes the burrs at the end
        props = props.substr(0, props.length - 1);
        insert = insert.substr(0, insert.length - 1);

        // Constructs the query
        let query = `insert into ${table} (${props}) values (${insert}) returning id;`;
        
        // Executes the query with the proper values
        db.exec(query, newValues, cb);
    }

    /**
     * Updates an entity
     * @function
     * @param {Object} newRecord Instantiated entity
     * @param {function} cb Callback function
     */
    update(entity, cb) {
        let table = entity.getTable();
        let update = '';
        let count = 1;
        let newValues = [];
        let propsArray = Object.getOwnPropertyNames(entity);
        
        /**
         * Iterates over the properties of the object to construct
         * the update clause and the related values
         */
        propsArray.forEach(
            function(val) {
                if (val !== 'id') {
                    newValues.push(entity[val] || null);
                    update += '"' + val + '" = $' + count + ', ';
                    count++;
                }
            }
        );

        // Removes the burrs at the end
        update = update.substr(0, update.length - 2);

        newValues.push(entity['id']);

        // Constructs the query
        let query = `update ${table} set ${update} where id = $${count};`;
            
        // Executes the query with the proper values
        db.exec(query, newValues, cb);
    }

    /**
     * Removes an entity
     * @function
     * @param {Object} newRecord Instantiated entity
     * @param {string} id The PK value for this entity
     * @param {function} cb Callback function
     */
    remove(entity, id, cb) {
        // Executes the query with the proper values
        db.exec(
            `delete from ${entity.getTable()} where id = $1;`,
            [id],
            cb);
    }

    //#region Coordinator_report handler
    
    /**
     * Saves a new Coordinator_report entity
     * @function
     * @param {Object} newRecord Instantiated entity
     * @param {function} cb Callback function
     */
    saveCoordReport(newRecord, cb) {
        // Constructs the query
        let query = `insert into coordinator_report (
                advisor_id, monitor_id, coordinator_id, renew) values (
                $1, $2, $3, $4);`;
        
        // Executes the query with the proper values
        db.exec(
            query,
            [
                newRecord.advisor_id,
                newRecord.monitor_id,
                newRecord.coordinator_id,
                newRecord.renew
            ],
            cb);
    }

    /**
     * Updates Coordinator_report entity
     * @function
     * @param {Object} entity Instantiated entity
     * @param {function} cb Callback function
     */
    updateCoordReport(entity, cb) {
        // Constructs the query
        let query = `update coordinator_report set renew = $1 where
            advisor_id = $2 and monitor_id = $3 and coordinator_id = $4;`;
            
        // Executes the query with the proper values
        db.exec(
            query,
            [
                entity.renew,
                entity.advisor_id,
                entity.monitor_id,
                entity.coordinator_id
            ],
            cb);
    }

    /**
     * Removes an Coordinator_report entity
     * @function
     * @param {string} advisor_id The Advisor Report ID
     * @param {string} monitor_id The Monitor Report ID
     * @param {string} coordinator_id The Coordinator Report ID
     * @param {function} cb Callback function
     */
    removeCoordReport(advisor_id, monitor_id, coordinator_id, cb) {
        let query = `delete from coordinator_report where 
            advisor_id = $1 and monitor_id = $2 and coordinator_id = $3;`
        // Executes the query with the proper values
        db.exec(
            query,
            [
                advisor_id,
                monitor_id,
                coordinator_id
            ],
            cb);
    }

    //#endregion
}

module.exports = Crud;
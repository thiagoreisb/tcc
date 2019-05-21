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
                    props += val + ',';
                    insert += '$' + count + ',';
                    count++;
                    newValues.push(newRecord[val]);
                }
            }
        );

        // Removes the burrs at the end
        props = props.substr(0, props.length - 1);
        insert = insert.substr(0, insert.length - 1);

        // Constructs the query
        let query = `insert into ${table} (${props}) values (${insert});`;
        
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
                    newValues.push(entity[val]);
                    update += val + ' = $' + count + ', ';
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
     * @param {function} cb Callback function
     */
    remove(entity, cb) {
        // Executes the query with the proper values
        db.exec(
            `delete from ${entity.getTable()} where id = $1;`,
            [entity['id']],
            cb);
    }
}

module.exports = Crud;
'use strict';

const table = 'class';

class Class {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} Class 
     */
    constructor(classe) {
        this.id = classe.id;
        this.name = classe.name;
    }

    /**
     * Returns the table related to this model
     */
    static getTable() {
        return table;
    }

    /**
     * Returns the table related to this model
     */
    getTable(){
        return table;
    }
}

module.exports = Class;
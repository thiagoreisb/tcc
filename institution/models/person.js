'use strict';

const table = 'person';

class Person {
    /**
     * Instantiates this class
     * @function
     * @param {JSON} person 
     */
    constructor(person) {
        this.id = person.id;
        this.name = person.name;
        this.email = person.email;
        this.type = person.type;
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

module.exports = Person;
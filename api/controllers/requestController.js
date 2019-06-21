'use strict';

const axios = require('axios');

class RequestController {
    /**
     * Returns the response of GET resource
     * @param {string} resource API resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    get(uri, resource, cb, err) {
        axios.get(uri + resource)
            .then((response) => cb(response.data))
            .catch((error) => err(error));
    }
}

const request = new RequestController();

module.exports = request;
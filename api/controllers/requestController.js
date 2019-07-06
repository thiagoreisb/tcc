'use strict';

const axios = require('axios');

class RequestController {
    /**
     * Returns the response of GET resource
     * @param {string} url API URL name
     * @param {string} resource API resource name
     */
    get(url, resource) {
        return axios.get(url + resource)
            .then((response) => response.data)
            .catch((error) => error);
    }
}

const request = new RequestController();

module.exports = request;
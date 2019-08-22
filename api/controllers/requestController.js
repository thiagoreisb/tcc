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

    /**
     * Returns the response of POST resource
     * @param {string} url API URL name
     * @param {string} resource API resource name
     * @param {object} data Data to be sent
     */
    post(url, resource, data) {
        return axios.post(url + resource, data)
            .then((response) => response.data)
            .catch((error) => error);
    }

    /**
     * Returns the response of PUT resource
     * @param {string} url API URL name
     * @param {string} resource API resource name
     * @param {object} data Data to be sent
     */
    put(url, resource, data) {
        return axios.put(url + resource, data)
            .then((response) => response.data)
            .catch((error) => error);
    }

    /**
     * Returns the response of DELETE resource
     * @param {string} url API URL name
     * @param {string} resource API resource name
     */
    delete(url, resource) {
        return axios.delete(url + resource)
            .then((response) => response.data)
            .catch((error) => error);
    }
}

const request = new RequestController();

module.exports = request;
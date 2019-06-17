'use strict';

const axios = require('axios');

class ApiController {
    constructor() {
        this.api_base = process.env.VUE_APP_FB_API_BASE;
    }

    /**
     * Returns the response of GET resource
     * @param {string} resource API resource
     * @param {function} cb Callback function
     * @param {function} err Callback error function
     */
    get(resource, cb, err) {
        axios.get(this.api_base + resource)
            .then((response) => cb(response.data))
            .catch((error) => err(error));
    }

}

const api = new ApiController();

export default api;
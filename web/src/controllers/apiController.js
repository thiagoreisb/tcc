'use strict';

const axios = require('axios');

class ApiController {
    constructor() {
        this.api_base = process.env.VUE_APP_FB_API_BASE;
    }
}

const api = new ApiController();

export default api;
import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import api from './controllers/apiController'
import fb from './utils/fb'

let app = '';

Vue.config.productionTip = false
Vue.use(Router);

var router = require('./router')(Router, fb);

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: function(h) {
        return h(App, {props: {serverData: fb, apiController: api}});
      }
    }).$mount('#app');
  }
});

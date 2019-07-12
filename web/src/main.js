import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
//import router from './router'
import api from './controllers/apiController'

var firebase = require('firebase');

let app = '';

// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_APIKEY,
  authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASEURL,
  projectId: process.env.VUE_APP_FB_PROJECTID,
  storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FB_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false
Vue.use(Router);

var router = require('./router')(Router, firebase);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: function(h) {
        return h(App, {props: {serverData: firebase, apiController: api}});
      }
    }).$mount('#app');
  }
});

/* eslint-disable */
/// Vue
import Vue from 'vue'
import Login from './Login.vue'

/// Firebase
var firebase = require('firebase');
//var firebase = require('firebase/app');
var firebaseui = require('firebaseui');

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

new Vue({
  render: h => h(Login),
}).$mount('#app')

const firebase = require('firebase');

class FB {
    constructor() {
        this.firebaseConfig = {
            apiKey: process.env.VUE_APP_FB_APIKEY,
            authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
            databaseURL: process.env.VUE_APP_FB_DATABASEURL,
            projectId: process.env.VUE_APP_FB_PROJECTID,
            storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
            messagingSenderId: process.env.VUE_APP_FB_MESSAGINGSENDERID,
            appId: process.env.VUE_APP_FB_APPID
        };

        // Initialize Firebase
        firebase.initializeApp(this.firebaseConfig);
    }
}

new FB();

export default firebase;

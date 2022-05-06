import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import store from "./store";

Vue.config.productionTip = false

Vue.use(require("moment")); // TODO try removing this line (https://stackoverflow.com/a/53892036/237509)

// const configOptions = {
//   apiKey: "",
//   authDomain: "vue-firebase-auth-2802d.firebaseapp.com",
//   databaseURL: "https://vue-firebase-auth-2802d.firebaseio.com",
//   projectId: "vue-firebase-auth-2802d",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };

const firebaseConfig = {
  apiKey: "AIzaSyClmckl-UpROYVay8OB5vogj_sZ2J4KyGA",
  authDomain: "lang-track-app.firebaseapp.com",
  databaseURL: "https://lang-track-app.firebaseio.com",
  projectId: "lang-track-app",
  storageBucket: "lang-track-app.appspot.com",
  messagingSenderId: "921058751230",
  appId: "1:921058751230:web:d5cb64960944605b6f6baf"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
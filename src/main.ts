import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

const firebaseConfig = {
  apiKey: "AIzaSyBV60lSb6Y1Y8ojVOR4zYn6NBz5U-cd9x4",
  authDomain: "finance-manager-4d396.firebaseapp.com",
  projectId: "finance-manager-4d396",
  storageBucket: "finance-manager-4d396.appspot.com",
  messagingSenderId: "972635535553",
  appId: "1:972635535553:web:d57ed9013af32c2859fc40",
  measurementId: "G-S510X5YFW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Listen for auth state change and update store
const userStore = getModule(UserStore, store);
auth.onAuthStateChanged((user) => {
  if (user) {
    userStore.setUser(user);
  } else {
    userStore.setUser(null);
  }
});

// exports
export { analytics, auth };

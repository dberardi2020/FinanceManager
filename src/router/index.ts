import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";

const userStore = getModule(UserStore, store);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "LogIn",
    component: () => import("../components/new-user/LogIn.vue"),
  },
  {
    path: "/purchases",
    name: "Purchases",
    component: () => import("../views/Purchases.vue"),
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    component: () => import("../views/Subscriptions.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  const currentUser = userStore.user;
  if (to.name !== "LogIn" && !currentUser) {
    next({ name: "LogIn" });
  } else if (to.name === "LogIn" && currentUser) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;

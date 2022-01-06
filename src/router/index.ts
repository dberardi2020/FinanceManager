import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../components/new-user/SignUp.vue"),
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

export default router;

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "LogInSignUp",
    component: () => import("../views/LogInSignUpView.vue"),
  },
  {
    path: "/purchases",
    name: "Purchases",
    component: () => import("../views/PurchaseView.vue"),
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    component: () => import("../views/SubscriptionView.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

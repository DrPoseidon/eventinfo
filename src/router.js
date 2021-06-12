import Vue from "vue";
import VueRouter from "vue-router";
import managersMainPage from "Pages/managersMainPage";
import login from "Pages/login";
import error404 from "Pages/error404";
import orders from "Pages/orders";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "*", redirect: "/404" },
    { path: "/404", name: "404", component: error404 },
    {
      path: "/",
      name: "managersMainPage",
      component: managersMainPage,
      children: [{ path: "orders", name: "orders", component: orders }],
    },
    { path: "/login", name: "login", component: login },
  ],
});

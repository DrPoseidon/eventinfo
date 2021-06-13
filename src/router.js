import Vue from "vue";
import VueRouter from "vue-router";
import mainView from "Pages/mainView";
import managersMainPage from "Pages/managersMainPage";
import login from "Pages/login";
import error404 from "Pages/error404";
import orders from "Pages/orders";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "*", redirect: "404" },
    { path: "/404", name: "404", component: error404 },
    {
      path: "/",
      component: mainView,
      name: "mainView",
      redirect: "managersMainPage",
      children: [
        {
          path: "managersMainPage",
          name: "managersMainPage",
          component: managersMainPage,
          meta: {
            requiresAuth: true,
          },
        },
        { path: "orders", name: "orders", component: orders },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) next({ path: "login" });
    next();
  } else {
    if (localStorage.getItem("token")) {
      if (from.name) {
        next({ path: from.name });
      } else {
        next({ path: "managersMainPage" });
      }
    }
    next();
  }
});

export default router;

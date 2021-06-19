import Vue from "vue";
import VueRouter from "vue-router";
import mainView from "Pages/mainView";
import managersMainPage from "Pages/managersMainPage";
import login from "Pages/login";
import error404 from "Pages/error404";
import orders from "Pages/orders";
import tariff from "Pages/tariff";
import requisite from "Pages/requisite";
import workers from "Pages/workers";
import workersMainPage from "Pages/workersMainPage";
import workerRequisite from "Pages/workerRequisite";
import purchase from "Pages/purchase";

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
      redirect: `${JSON.parse(
        localStorage.vuex
      ).user.role.toLowerCase()}sMainPage`,
      children: [
        {
          path: "managersMainPage",
          name: "managersMainPage",
          component: managersMainPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "workersMainPage",
          name: "workersMainPage",
          component: workersMainPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "orders",
          name: "orders",
          component: orders,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "tariff",
          name: "tariff",
          component: tariff,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "requisite",
          name: "requisite",
          component: requisite,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "workerRequisite",
          name: "workerRequisite",
          component: workerRequisite,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "workers",
          name: "workers",
          component: workers,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "purchase",
          name: "purchase",
          component: purchase,
          meta: {
            requiresAuth: true,
          },
        },
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

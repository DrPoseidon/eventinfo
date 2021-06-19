import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const VueInputMask = require("vue-inputmask").default;
Vue.use(VueInputMask);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

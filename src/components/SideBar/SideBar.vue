<template>
  <div class="sideBar">
    <router-link :to="mainRoute">Главная</router-link>
    <router-link :to="{ name: 'orders' }">Заказы</router-link>
    <router-link :to="{ name: requisite.name }">{{
      requisite.title
    }}</router-link>
    <router-link :to="{ name: 'workers' }">Персонал</router-link>
    <router-link :to="{ name: 'tariff' }">Тарифы</router-link>
    <hr />
    <a @click="logout">Выход</a>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SideBar",
  methods: {
    ...mapActions(["LOGOUT"]),
    logout() {
      localStorage.removeItem("token");
      this.LOGOUT();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["USER"]),
    mainRoute() {
      return `/${this.USER.role.toLowerCase()}sMainPage`;
    },
    requisite() {
      const role = this.USER.role;
      if (role === "MANAGER") return { name: "requisite", title: "Реквизит" };
      return { name: "workerRequisite", title: "Мой реквизит" };
    },
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

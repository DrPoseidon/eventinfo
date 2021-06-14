<template>
  <div class="sideBar">
    <router-link :to="mainRoute">Главная</router-link>
    <router-link :to="{ name: 'orders' }">Заказы</router-link>
    <router-link to="#">Склад</router-link>
    <router-link to="#">Заявки</router-link>
    <router-link to="#">Персонал</router-link>
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
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

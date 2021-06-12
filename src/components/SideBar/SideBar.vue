<template>
  <div class="sideBar">
    <router-link to="#">Главная</router-link>
    <router-link to="#">Заказы</router-link>
    <router-link to="#">Склад</router-link>
    <router-link to="#">Заявки</router-link>
    <router-link to="#">Бухгатлерия</router-link>
    <router-link to="#">Персонал</router-link>
    <hr />
    <router-link to="#">Выход</router-link>
  </div>
</template>
<script>
export default {
  name: "SideBar",
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

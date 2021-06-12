<template>
  <div class="mainView">
    <SideBar />
    <router-view />
  </div>
</template>
<script>
import SideBar from "Components/SideBar";
export default {
  components: { SideBar },
  name: "mainView",
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

<template>
  <div class="login">
    <p>Авторизация</p>
    <form @submit="checkForm">
      <input
        type="text"
        placeholder="Введите логин"
        name="login"
        v-model="login"
      />
      <input
        type="password"
        placeholder="Введите пароль"
        name="password"
        autocomplete="on"
        v-model="password"
      />
      <button type="submit" pre>Войти</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["LOGIN"]),
    action() {
      const { login, password } = this;
      this.LOGIN({ login, password });
    },
    checkForm(evt) {
      evt.preventDefault();
      if (this.login && this.password) this.action();
    },
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

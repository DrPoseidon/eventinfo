<template>
  <div class="login">
    <p>Авторизация</p>
    <form @submit.prevent="checkForm">
      <input
        type="email"
        placeholder="Введите email"
        name="email"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Введите пароль"
        name="password"
        autocomplete="on"
        v-model="password"
      />
      <button type="submit">Войти</button>
    </form>
    <p class="message" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      email: "worker4@mail.ru",
      password: "123",
      message: "",
    };
  },
  methods: {
    ...mapActions(["LOGIN"]),
    action() {
      const { email, password } = this;
      this.LOGIN({ email, password })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            const route = JSON.parse(localStorage.vuex).user.role.toLowerCase();
            this.$router.push(`${route}sMainPage`);
          }
        })
        .catch(() => {
          this.message = "Пользователь не найден";
          setTimeout(() => {
            this.message = "";
          }, 3000);
        });
    },
    checkForm() {
      if (this.email && this.password) this.action();
    },
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

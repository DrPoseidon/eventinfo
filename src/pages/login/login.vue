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
      <button type="submit" pre>Войти</button>
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
      email: "manager@email.com",
      password: "123321",
      message: "",
    };
  },
  methods: {
    ...mapActions(["LOGIN"]),
    action() {
      const { email, password } = this;
      this.LOGIN({ email, password }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", JSON.stringify(res.token));
          this.$router.push("/");
        } else {
          this.message = res.message;
          setTimeout(() => {
            this.message = "";
          }, 3000);
        }
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

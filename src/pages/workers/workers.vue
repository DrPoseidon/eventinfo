<template>
  <div class="workers">
    <table ref="table">
      <caption>
        Персонал
      </caption>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Email</th>
          <th v-if="add">Пароль</th>
          <th>Должность</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in workers" :key="index">
          <td>
            {{ row.name[0].toUpperCase() + row.name.slice(1) }}
          </td>
          <td>
            {{ row.email }}
          </td>
          <td v-if="add"></td>
          <td>
            {{ getRole(row.role) }}
          </td>
        </tr>
        <tr v-if="add">
          <td colspan="4">
            <form @submit.prevent="send">
              <input type="text" placeholder="Введите имя" v-model="name" />

              <input type="email" placeholder="Введите email" v-model="email" />

              <input type="text" placeholder="Пароль" v-model="password" />

              <select v-model="role">
                <option value="" selected disabled>Выберете должность</option>
                <option value="MANAGER">Менеджер</option>
                <option value="OPERATOR">Оператор</option>
                <option value="WORKER">Ведущий</option>
              </select>
              <button class="add" v-if="add">Отправить</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="add" @click="add = true" v-if="!add">Регистрация</button>

    <button class="reset" @click="reset" v-if="add">Отменить</button>
    <p class="message" v-if="!workers.length || this.message">{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "tariff",
  data() {
    return {
      workers: [],
      message: "",
      add: false,
      name: "",
      email: "",
      password: "",
      role: [],
    };
  },
  methods: {
    ...mapActions(["GET_WORKERS", "REGISTRATION"]),
    send() {
      const { name, email, password, role } = this;
      if (name && email && role && password) {
        this.REGISTRATION({ name, email, password, role }).then((res) => {
          if (res.message) {
            this.message = res.message;
            setTimeout(() => {
              this.message = "";
            }, 5000);
          } else {
            this.getWorkers();
            this.reset();
          }
        });
      }
    },
    reset() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.role = "role";
      this.add = false;
    },
    getWorkers() {
      this.GET_WORKERS()
        .then((res) => {
          this.workers = res.workers;
        })
        .catch(() => {
          this.message = "Нет работников";
        });
    },
    getRole(role) {
      if (role === "MANAGER") return "Менеджер";
      if (role === "WORKER") return "Ведущий";
      if (role === "OPERATOR") return "Оператор";
    },
  },
  mounted() {
    if (JSON.parse(localStorage.vuex).user.role === "MANAGER") {
      this.getWorkers();
    } else {
      this.$router.push(
        `/${JSON.parse(localStorage.vuex).user.role.toLowerCase()}sMainPage`
      );
    }
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

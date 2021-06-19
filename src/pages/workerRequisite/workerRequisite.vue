<template>
  <div class="workerRequisite">
    <table ref="table">
      <caption>
        Реквизит
      </caption>
      <thead>
        <tr>
          <th>Название</th>
          <th>Инфо</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in requisite" :key="index">
          <td>
            {{
              row.requisite_name[0].toUpperCase() + row.requisite_name.slice(1)
            }}
          </td>
          <td>
            {{ row.requisite_info }}
          </td>
          <td>
            {{ row.requisite_status }}
          </td>
        </tr>
        <tr v-if="add && role === 'WORKER'">
          <td>
            <input type="text" placeholder="Название" v-model="name" />
          </td>
          <td>
            <input type="text" placeholder="Информация" v-model="info" />
          </td>
          <td>
            <button class="add" @click="send">
              Отправить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="add" @click="add = true" v-if="!add && role === 'WORKER'">
      Добавить
    </button>
    <button class="reset" @click="reset" v-if="add && role === 'WORKER'">
      Отменить
    </button>
    <p class="message" v-else>{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "workerRequisite",
  data() {
    return {
      requisite: [],
      message: "",
      name: "",
      info: "",
      add: false,
      role: "",
    };
  },
  methods: {
    ...mapActions(["GET_WORKER_REQUISITE", "SET_REQUISITE"]),
    getRequisite() {
      const id = JSON.parse(localStorage.vuex).user.id;
      this.GET_WORKER_REQUISITE({ user_id: id })
        .then((res) => {
          this.requisite = res;
        })
        .catch(() => {
          this.message = "Нет реквизита";
        });
    },
    reset() {
      this.name = "";
      this.info = "";
      this.add = false;
      this.message = "";
    },
    send() {
      const { name, info } = this;
      const id = JSON.parse(localStorage.vuex).user.id;
      if (name && info) {
        this.SET_REQUISITE({
          requisite_name: name,
          requisite_info: info,
          user_id: id,
        }).then(() => {
          this.getRequisite();
          this.reset();
        });
      }
    },
  },
  mounted() {
    this.role = JSON.parse(localStorage.vuex).user.role;
    if (this.role === "WORKER") {
      this.getRequisite();
    } else {
      this.$router.push(`/${this.role.toLowerCase()}sMainPage`);
    }
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

<template>
  <div class="operatorsMainPage">
    <div class="operatorInfo" :style="{ width: width }">
      <h2>Информация пользователя</h2>
      <div class="row">
        <p>Email:</p>
        <p>{{ USER.email }}</p>
      </div>
      <div class="row">
        <p>Должность:</p>
        <p>{{ role }}</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Имя клиента</th>
          <th>Email клиента</th>
          <th>Номер телефона клиента</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in clients" :key="index">
          <td>
            {{ row.client_name[0].toUpperCase() + row.client_name.slice(1) }}
          </td>
          <td>
            {{ row.client_email }}
          </td>
          <td>
            {{ row.client_phone }}
          </td>
        </tr>
        <tr v-if="add">
          <td colspan="3">
            <form @submit.prevent="send">
              <input
                type="text"
                placeholder="Имя клиента"
                v-model="client.client_name"
              />
              <input
                type="email"
                placeholder="Email клиента"
                v-model="client.client_email"
              />
              <input
                type="tel"
                placeholder="Номер телефона клиента"
                v-mask="{ mask: '+7(999) 999-99-99', showMaskOnHover: false }"
                v-model="client.client_phone"
              />
              <button class="add" v-if="add">
                Отправить
              </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="add" @click="add = true" v-if="!add">
      Добавить
    </button>

    <button class="reset" @click="reset" v-if="add">
      Отменить
    </button>
    <p class="message" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "operatorsMainPage",
  data() {
    return {
      message: "",
      clients: [],
      add: false,
      client: {
        client_name: "",
        client_email: "",
        client_phone: "",
      },
    };
  },
  components: {},
  computed: {
    ...mapGetters(["USER"]),
    width() {
      this.$nextTick(() => {
        if (this.$refs.table) {
          this.$refs.managerInfo.style.width = `${this.$refs.table.clientWidth}px`;
        }
      });
      return "auto";
    },
    role() {
      if (this.USER.role === "MANAGER") return "менеджер";
      else if (this.USER.role === "WORKER") return "работник";
      else if (this.USER.role === "OPERATOR") return "оператор";
      return "";
    },
  },
  methods: {
    ...mapActions(["GET_CLIENTS", "SEND_CLIENT"]),
    getClients() {
      this.GET_CLIENTS().then((res) => {
        this.clients = res;
      });
    },
    send() {
      const { client_phone, client_name, client_email } = this.client;
      if (client_phone && client_name && client_email) {
        this.SEND_CLIENT(this.client).then(() => {
          this.reset();
          this.getClients();
        });
      }
    },
    reset() {
      this.client = { client_name: "", client_email: "", client_phone: "" };
      this.add = false;
    },
  },
  mounted() {
    if (JSON.parse(localStorage.vuex).user.role === "OPERATOR") {
      this.getClients();
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

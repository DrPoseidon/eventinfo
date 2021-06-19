<template>
  <div class="purchase">
    <h2 v-if="requisite.length">Заявка на закупку</h2>
    <select v-model="value" v-if="requisite.length">
      <option value="" disabled selected>Выберете реквизит</option>
      <option
        :value="req.requisite_id"
        v-for="req in requisite"
        :key="req.requisite_id"
      >
        {{ req.requisite_name[0].toUpperCase() + req.requisite_name.slice(1) }}
      </option>
    </select>
    <p class="message" v-if="message" :class="{ error: error }">
      {{ message }}
    </p>
    <button @click="send" v-if="requisite.length && value">Отправить</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "purchase",
  data() {
    return {
      requisite: {},
      value: "",
      message: "",
      error: false,
    };
  },
  methods: {
    ...mapActions(["SEND_PURCHASE", "GET_WORKER_REQUISITE"]),
    getRequisite() {
      const id = JSON.parse(localStorage.vuex).user.id;
      this.GET_WORKER_REQUISITE({ user_id: id })
        .then((res) => {
          this.requisite = res;
        })
        .catch(() => {
          this.message = "Нет реквизита";
          this.error = true;
        });
    },
    send() {
      if (this.value) {
        this.SEND_PURCHASE({ req_id: this.value }).then(() => {
          this.value = "";
          this.message = "Заявка отправлена";
          setTimeout(() => {
            this.message = "";
          }, 3000);
        });
      }
    },
  },
  mounted() {
    this.getRequisite();
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

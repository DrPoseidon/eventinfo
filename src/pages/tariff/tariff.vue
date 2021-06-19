<template>
  <div class="tariff">
    <table ref="table" v-if="tariffs.length">
      <caption>
        Тарифы
      </caption>
      <thead>
        <tr>
          <th>Название тарифа</th>
          <th>Цена</th>
          <th>Зарплата ведущего</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in tariffs" :key="index">
          <td>
            {{ row.tariff_name[0].toUpperCase() + row.tariff_name.slice(1) }}
          </td>
          <td>
            {{ row.tariff_price }}
          </td>
          <td>
            {{ row.salary_worker }}
          </td>
        </tr>
        <tr v-if="add && role === 'MANAGER'">
          <td>
            <input
              type="text"
              placeholder="Название тарифа"
              v-model="tariff_name"
            />
          </td>
          <td>
            <input type="number" placeholder="Цена" v-model="tariff_price" />
          </td>
          <td>
            <input
              type="number"
              placeholder="Зарплата ведущего"
              v-model="salary_worker"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button class="add" @click="add = true" v-if="!add && role === 'MANAGER'">
      Добавить
    </button>
    <button class="add" @click="send" v-if="add && role === 'MANAGER'">
      Отправить
    </button>
    <button class="reset" @click="reset" v-if="add && role === 'MANAGER'">
      Отменить
    </button>
    <p class="message" v-else>{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "tariff",
  data() {
    return {
      tariffs: [],
      message: "",
      add: false,
      tariff_name: "",
      tariff_price: "",
      salary_worker: "",
      role: "",
    };
  },
  methods: {
    ...mapActions(["GET_TARIFFS", "SEND_TARIFF"]),
    send() {
      const { tariff_name, tariff_price, salary_worker } = this;
      if (tariff_name && tariff_price && salary_worker) {
        this.SEND_TARIFF({ tariff_name, tariff_price, salary_worker }).then(
          (res) => {
            if (res.status === 202) {
              this.reset();
              this.getTariffs();
            }
          }
        );
      }
    },
    reset() {
      this.tariff_name = "";
      this.tariff_price = "";
      this.salary_worker = "";
      this.add = false;
    },
    getTariffs() {
      this.GET_TARIFFS()
        .then((res) => {
          this.tariffs = res;
        })
        .catch(() => {
          this.message = "Нет тарифов";
        });
    },
  },
  mounted() {
    this.getTariffs();
    this.role = JSON.parse(localStorage.vuex).user.role;
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

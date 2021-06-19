<template>
  <div class="workersMainPage">
    <div class="workerInfo" :style="{ width: width }" ref="worker">
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
    <table ref="table" v-if="upcomingWorks.length">
      <caption>
        Необработанные заявки
      </caption>
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Место</th>
          <th>Имя клиента</th>
          <th>Телефон клиента</th>
          <th>Выполнить</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in upcomingWorks" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            {{ row.event_name[0].toUpperCase() + row.event_name.slice(1) }}
          </td>
          <td>
            {{ getRusDate(row.event_date) }}
          </td>
          <td>
            C {{ row.event_start_time.slice(0, 5) }} до
            {{ row.event_end_time.slice(0, 5) }}
          </td>
          <td>{{ row.event_place }}</td>
          <td>{{ row.client_name }}</td>
          <td>{{ row.client_phone }}</td>
          <td
            style="cursor:pointer;"
            @click="setEventHost(row)"
            :class="{ action: !row.name }"
          >
            <a>ОК</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="message" v-if="message || !upcomingWorks.length">{{ message }}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "workersMainPage",
  data() {
    return {
      upcomingWorks: [],
      message: "",
    };
  },
  computed: {
    ...mapGetters(["USER"]),
    role() {
      if (this.USER.role === "MANAGER") return "менеджер";
      else if (this.USER.role === "WORKER") return "работник";
      else if (this.USER.role === "OPERATOR") return "оператор";
      return "";
    },
    width() {
      this.$nextTick(() => {
        if (this.$refs.table) {
          this.$refs.worker.style.width = `${this.$refs.table.clientWidth}px`;
        }
      });
      return "auto";
    },
  },
  methods: {
    ...mapActions(["GET_UPCOMING_WORKS", "SET_ORDER"]),
    getRusDate(date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return `${day}.${month}.${year}`;
    },
    send(el) {
      const { price } = this;
      if (price && price >= 0) {
        this.SEND_UNPROCESSED_PURSH({ id: el.purchase_id, price }).then(
          (res) => {
            if (res.status === 200) {
              this.getUnprocessedPursh();
            }
          }
        );
      }
    },
    getUpcomingWorks() {
      this.GET_UPCOMING_WORKS()
        .then((res) => {
          if (res.length) {
            this.upcomingWorks = res;
          } else {
            this.message = "Нет заказов";
          }
        })
        .catch(() => {});
    },
    setEventHost(row) {
      this.SET_ORDER({ order_id: row.order_id }).then(() => {
        this.getUpcomingWorks();
      });
    },
  },
  mounted() {
    if (JSON.parse(localStorage.vuex).user.role === "WORKER") {
      this.getUpcomingWorks();
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

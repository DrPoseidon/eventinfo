<template>
  <div class="orders">
    <p class="message" v-if="message">{{ message }}</p>
    <table ref="table" v-if="orders.length">
      <caption>
        Заказы
      </caption>
      <thead>
        <tr>
          <th>Вид мероприятия</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Место</th>
          <th>Ведущий</th>
          <th v-if="isSet && role === 'MANAGER'"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in orders" :key="index">
          <td>
            {{ row.event_name[0].toUpperCase() + row.event_name.slice(1) }}
          </td>
          <td>{{ getRusDate(row.event_date) }}</td>
          <td>
            C {{ row.event_start_time.slice(0, 5) }} до
            {{ row.event_end_time.slice(0, 5) }}
          </td>
          <td>
            {{ row.event_place[0].toUpperCase() + row.event_place.slice(1) }}
          </td>
          <td v-if="row.name">{{ row.name }}</td>
          <td
            style="cursor:pointer;"
            @click="setEventHost(row)"
            v-if="
              !row.name &&
                (!isSet || (isSet && row !== order)) &&
                role === 'MANAGER'
            "
            :class="{ action: !row.name }"
          >
            <a>Назначить</a>
          </td>
          <td
            v-if="isSet && order === row && role === 'MANAGER'"
            style="display:flex;flex-direction:row;align-items:center;"
          >
            <select v-model="worker"
              ><option v-for="work in workers" :key="work.id" :value="work"
                ><p v-if="work.name">Имя: {{ work.name }} &nbsp;</p>
                <p v-if="work.email">Email: {{ work.email }}</p></option
              ></select
            >
            <button @click="setEventHostToDB()">Назначить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      orders: [],
      workers: [],
      worker: [],
      order: {},
      message: "",
      isSet: false,
      role: "",
    };
  },
  methods: {
    ...mapActions(["GET_ORDERS", "GET_WORKERS", "SET_WORKER"]),
    getRusDate(date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return `${day}.${month}.${year}`;
    },
    setEventHost(row) {
      this.isSet = true;
      this.order = row;
    },
    setEventHostToDB() {
      this.SET_WORKER({
        user_id: this.worker.id,
        order_id: this.order.order_id,
      }).then((res) => {
        if (res.message === "Ведущий назначен!") {
          this.GET_ORDERS()
            .then((orders) => {
              this.orders = orders.orders;
            })
            .catch(() => {
              this.message = "Нет заказов";
            });
        }
        if (res.message === "Выбранный ведущий занят в это время!") {
          this.message = res.message;
          setTimeout(() => {
            this.message = "";
          }, 5000);
        }
      });
    },
    getOrders() {
      this.GET_ORDERS()
        .then((orders) => {
          this.orders = orders.orders;
        })
        .catch(() => {
          this.message = "Нет заказов";
        });
    },
    getWorkers() {
      this.GET_WORKERS().then((workers) => {
        this.workers = workers.workers;
        this.workers = workers.workers.filter((worker) => {
          if (worker.role === "WORKER") return worker;
        });
      });
    },
  },
  mounted() {
    this.getOrders();
    this.getWorkers();
    this.role = JSON.parse(localStorage.vuex).user.role;
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

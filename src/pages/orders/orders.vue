<template>
  <div class="orders">
    <table ref="table" v-if="orders.length">
      <caption>
        Необработанные заявки
      </caption>
      <thead>
        <tr>
          <th>Вид мероприятия</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Ведущий</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in orders" :key="index">
          <td>{{ row.event_name }}</td>
          <td>{{ getRusDate(row.event_date) }}</td>
          <td>
            C {{ row.event_start_time.slice(0, 5) }} до
            {{ row.event_end_time.slice(0, 5) }}
          </td>
          <td>{{ row.event_host }}</td>
        </tr>
      </tbody>
    </table>
    <p class="message" v-else>{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      orders: [],
      message: "",
    };
  },
  methods: {
    ...mapActions(["GET_ORDERS"]),
    getRusDate(date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return `${day}.${month}.${year}`;
    },
  },
  mounted() {
    this.GET_ORDERS()
      .then((res) => {
        if (res.data) this.orders = res.data;
      })
      .catch((err) => {
        this.message = err.data.message;
      });
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

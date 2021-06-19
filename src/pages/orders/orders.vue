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
            <select v-model="worker">
              <option value="" disabled selected>Выбырете ведущего</option>
              <option v-for="work in workers" :key="work.id" :value="work"
                ><p v-if="work.name">Имя: {{ work.name }} &nbsp;</p>
                <p v-if="work.email">Email: {{ work.email }}</p></option
              ></select
            >
            <button @click="setEventHostToDB()">Назначить</button>
          </td>
        </tr>
        <tr v-if="role === 'OPERATOR' && add">
          <td colspan="5">
            <form @submit.prevent="send">
              <input
                type="text"
                placeholder="Вид мероприятия"
                v-model="orderData.event_name"
              />
              <input type="date" v-model="orderData.event_date" />
              C<input
                type="time"
                v-model="orderData.event_start_time"
              />до<input type="time" v-model="orderData.event_end_time" />
              <input
                type="text"
                placeholder="Место проведения"
                v-model="orderData.event_place"
              />
              <input
                type="number"
                placeholder="Количество людей"
                v-model="orderData.event_people_count"
              />
              <select v-model="orderData.tariff_id">
                <option value="" disabled selected>Выберете тариф</option>
                <option
                  :value="tariff.tariff_id"
                  v-for="tariff in tariffs"
                  :key="tariff.tariff_id"
                >
                  {{ tariff.tariff_name }}
                </option>
              </select>
              <select v-model="orderData.client_id">
                <option value="" disabled selected>Выберете клиента</option>
                <option
                  :value="client.client_id"
                  v-for="client in clients"
                  :key="client.client_id"
                >
                  {{ client.client_name }}({{ client.client_email }})
                </option>
              </select>
              <select v-model="orderData.quest_id">
                <option value="" disabled selected>Выберете квест</option>
                <option
                  :value="quest.quest_id"
                  v-for="quest in quests"
                  :key="quest.quest_id"
                >
                  {{ quest.quest_name }}
                </option>
              </select>
              <button class="add" type="submit">Отправить</button>
            </form>
            <button class="reset" @click="reset">Отмена</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="add" @click="add = true" v-if="role === 'OPERATOR' && !add">
      Добавить
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      orderData: {
        event_name: "",
        event_date: "",
        event_start_time: "",
        event_end_time: "",
        event_place: "",
        tariff_id: "",
        event_people_count: "",
        quest_id: "",
        client_id: "",
      },
      tariffs: [],
      orders: [],
      workers: [],
      worker: [],
      order: {},
      message: "",
      isSet: false,
      role: "",
      add: false,
      clients: [],
      quests: [],
    };
  },
  methods: {
    ...mapActions([
      "GET_ORDERS",
      "GET_WORKERS",
      "SET_WORKER",
      "SEND_ORDER_DATA",
      "GET_TARIFFS",
      "GET_CLIENTS",
      "GET_QUESTS",
    ]),
    send() {
      const {
        event_name,
        event_date,
        event_start_time,
        event_end_time,
        event_place,
        tariff_id,
        event_people_count,
        quest_id,
        client_id,
      } = this.orderData;
      if (
        event_name &&
        event_date &&
        event_start_time &&
        event_end_time &&
        event_place &&
        tariff_id &&
        event_people_count &&
        quest_id &&
        client_id
      ) {
        console.log(this.orderData);
        this.SEND_ORDER_DATA(this.orderData).then(() => {
          this.getOrders();
          this.getWorkers();
          this.reset();
        });
      }
    },
    getRusDate(date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return `${day}.${month}.${year}`;
    },
    reset() {
      this.orderData = {
        event_name: "",
        event_date: "",
        event_start_time: "",
        event_end_time: "",
        event_place: "",
        tariff_id: "",
        event_people_count: "",
        quest_id: "",
        client_id: "",
      };
      this.add = false;
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
    getTariffs() {
      this.GET_TARIFFS().then((res) => {
        this.tariffs = res;
      });
    },
    getClients() {
      this.GET_CLIENTS().then((res) => {
        this.clients = res;
      });
    },
    getQuests() {
      this.GET_QUESTS().then((res) => {
        this.quests = res;
      });
    },
  },
  mounted() {
    this.getOrders();
    this.getWorkers();
    this.getTariffs();
    this.getClients();
    this.getQuests();
    this.role = JSON.parse(localStorage.vuex).user.role;
  },
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>

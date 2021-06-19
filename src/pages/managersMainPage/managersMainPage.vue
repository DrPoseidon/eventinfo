<template>
  <div class="managersMainPage">
    <div class="managerInfo" :style="{ width: width }" ref="managerInfo">
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

    <table ref="table" v-if="unprocessedPursh.length">
      <caption>
        Необработанные заявки
      </caption>
      <thead>
        <tr>
          <th>№</th>
          <th>Название реквизита</th>
          <th>Статус закупки</th>
          <th>Подтверждение</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in unprocessedPursh" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            {{
              row.requisite_name[0].toUpperCase() + row.requisite_name.slice(1)
            }}
          </td>
          <td>
            {{
              row.purchase_status[0].toUpperCase() +
                row.purchase_status.slice(1).toLowerCase()
            }}
          </td>
          <td>
            <input
              type="number"
              placeholder="Введите цену"
              v-model="price"
            /><button @click="send(row)" v-if="price">
              ОК
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="message" v-else>{{ message }}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "managersMainPage",
  data() {
    return {
      unprocessedPursh: [],
      message: "",
      price: "",
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
          this.$refs.managerInfo.style.width = `${this.$refs.table.clientWidth}px`;
        }
      });
      return "auto";
    },
  },
  methods: {
    ...mapActions(["GET_UNPROCESSED_PURSH", "SEND_UNPROCESSED_PURSH"]),
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
    getUnprocessedPursh() {
      this.GET_UNPROCESSED_PURSH()
        .then((res) => {
          this.unprocessedPursh = res.purchases;
        })
        .catch(() => {
          this.message = "Нет необработанных заявок";
        });
    },
  },
  mounted() {
    if (JSON.parse(localStorage.vuex).user.role === "MANAGER") {
      this.getUnprocessedPursh();
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

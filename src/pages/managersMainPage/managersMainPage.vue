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
    ...mapActions(["GET_UNPROCESSED_PURSH"]),
  },
  mounted() {
    this.GET_UNPROCESSED_PURSH()
      .then((res) => {
        if (res.data) this.unprocessedPursh = res.data;
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

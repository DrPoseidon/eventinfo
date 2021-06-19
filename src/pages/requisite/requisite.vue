<template>
  <div class="requisite">
    <table ref="table" v-if="requisite.length">
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
      </tbody>
    </table>
    <p class="message" v-else>{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "tariff",
  data() {
    return {
      requisite: [],
      message: "",
    };
  },
  methods: {
    ...mapActions(["GET_REQUISITE"]),
    getRequisite() {
      this.GET_REQUISITE()
        .then((res) => {
          this.requisite = res;
          this.message = "";
        })
        .catch(() => {
          this.message = "Нет реквизита";
        });
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

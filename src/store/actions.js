//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

import axios from "axios";
const uri = "http://localhost:5000/api/";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
// import MD5 from "crypto-js/md5";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export default {
  LOGIN: async ({ commit }, data) => {
    const res = await axios.post(`${uri}user/login`, data);
    if (res) {
      commit("SET_USER", res.data.user);
    }
    return res;
  },
  LOGOUT: ({ commit }) => {
    commit("SET_USER", { id: "", email: "", name: "", role: "" });
  },
  GET_UNPROCESSED_PURSH: async () => {
    const res = await axios.get(`${uri}manager/unprocessedpursh`);
    return res.data;
  },
  GET_ORDERS: async () => {
    const res = await axios.get(`${uri}user/orders`);
    return res.data;
  },
  GET_WORKERS: async () => {
    const res = await axios.get(`${uri}manager/workers`);
    return res.data;
  },
  SET_WORKER: async (vuex, data) => {
    const res = await axios.post(`${uri}manager/assignment `, data);
    return res.data;
  },
};

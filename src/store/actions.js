import axios from "axios";
const uri = "http://localhost:5000/api/";

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
  REGISTRATION: async (_, data) => {
    const res = await axios.post(`${uri}manager/registration`, data);
    return res.data;
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET
  GET_UPCOMING_WORKS: async () => {
    const res = await axios.get(`${uri}manager/upcomingworks`);
    return res.data;
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
  GET_TARIFFS: async () => {
    const res = await axios.get(`${uri}user/tariffs`);
    return res.data;
  },
  GET_REQUISITE: async () => {
    const res = await axios.get(`${uri}manager/requisite`);
    return res.data;
  },
  GET_WORKER_REQUISITE: async (_, data) => {
    const res = await axios.post(`${uri}worker/requisite`, data);
    return res.data;
  },
  GET_CLIENTS: async (_, data) => {
    const res = await axios.get(`${uri}user/clients`, data);
    return res.data;
  },
  GET_QUESTS: async (_, data) => {
    const res = await axios.get(`${uri}user/quests`, data);
    return res.data;
  },
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SET
  SET_WORKER: async (_, data) => {
    const res = await axios.post(`${uri}manager/assignment `, data);
    return res.data;
  },
  SET_ORDER: async (_, data) => {
    const res = await axios.post(`${uri}worker/completeorder `, data);
    return res.data;
  },
  SET_REQUISITE: async (_, data) => {
    const res = await axios.post(`${uri}worker/requisiteadd `, data);
    return res.data;
  },
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SEND
  SEND_UNPROCESSED_PURSH: async (_, data) => {
    const res = await axios.post(`${uri}manager/completepurchase `, data);
    return res;
  },
  SEND_TARIFF: async (_, data) => {
    const res = await axios.post(`${uri}manager/tariffadd `, data);
    return res;
  },
  SEND_PURCHASE: async (_, data) => {
    const res = await axios.post(`${uri}worker/purchasecreate `, data);
    return res;
  },
  SEND_ORDER_DATA: async (_, data) => {
    const res = await axios.post(`${uri}operator/orderadd `, data);
    return res;
  },
  SEND_CLIENT: async (_, data) => {
    const res = await axios.post(`${uri}operator/clientadd `, data);
    return res;
  },

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
};

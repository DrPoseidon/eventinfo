//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

// import axios from "axios";
// const uri = "http://localhost:5000/api/";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
import MD5 from "crypto-js/md5";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export default {
  LOGIN: async ({ commit }, data) => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

    // const res = await axios.post(`${uri}user/login`, data);
    // if (res.status === 200) {
    //   commit("SET_USER", res.data.user);
    //   return res;
    // } else if(res.status === 404) {
    //   return res.data.message;
    // }

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ЗАКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
    const users = [
      {
        id: "user1",
        email: "manager@email.com",
        password: "123321",
        role: "MANAGER",
      },
      {
        id: "user2",
        email: "worker@email.com",
        password: "123321",
        role: "WORKER",
      },
      {
        id: "user3",
        email: "operator@email.com",
        password: "123321",
        role: "OPERATOR",
      },
    ];

    const user = users.find((user) => {
      return user.email === data.email && user.password === data.password;
    });
    if (user) delete user.password;

    const res = new Promise((resolve, reject) => {
      if (user) {
        resolve({ status: 200, data: { user, token: MD5(user).toString() } });
        commit("SET_USER", user);
      } else {
        reject({ status: 404, data: { message: "Пользователь не найден" } });
      }
    });
    return res;
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  },
  GET_UNPROCESSED_PURSH: async () => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

    // const res = await axios.post(`${uri}manager/unprocessedpursh`, data);

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
    const data = [
      {
        requisite_name: "добавленный рек",
        purchase_status: "ОЖИДАЕТСЯ ЗАКУПКА",
      },
      {
        requisite_name: "Реквизит №5",
        purchase_status: "ОЖИДАЕТСЯ ЗАКУПКА",
      },
      {
        requisite_name: "добавленный рек",
        purchase_status: "ОЖИДАЕТСЯ ЗАКУПКА",
      },
      {
        requisite_name: "Реквизит №5",
        purchase_status: "ОЖИДАЕТСЯ ЗАКУПКА",
      },
    ];
    const res = new Promise((resolve, reject) => {
      if (data.length) {
        resolve({ status: 200, data: data });
      } else {
        reject({ status: 404, data: { message: "Нет заявок" } });
      }
    });
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    return res;
  },

  GET_ORDERS: async () => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

    // const res = await axios.post(`${uri}manager/orders`, data);

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
    const data = [
      {
        event_date: "2021-06-08T2121:00:00.000Z",
        event_start_time: "13:00:00",
        event_end_time: "16:00:00",
        event_people_count: 5,
        event_place: "г. Воронеж",
        event_name: null,
        event_statues: "ЗАБРОНИРОВАНО",
        event_type: "Вид мероприятия",
        event_host: "Андрей",
      },
      {
        event_date: "2021-06-08T2121:00:00.000Z",
        event_start_time: "17:00:00",
        event_end_time: "20:00:00",
        event_people_count: 10,
        event_place: "г. Липецк",
        event_name: null,
        event_statues: "ЗАБРОНИРОВАНО",
        event_type: "Вид мероприятия",
        event_host: null,
      },
    ];
    const res = new Promise((resolve, reject) => {
      if (data.length) {
        resolve({ status: 200, data: data });
      } else {
        reject({ status: 404, data: { message: "Нет заказов" } });
      }
    });
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    return res;
  },
};

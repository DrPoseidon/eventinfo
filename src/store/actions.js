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
  UNPROCESSED_PURSH: async () => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

    // const res = await axios.post(`${uri}manager/unprocessedpursh`, data);
    // return res

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
};

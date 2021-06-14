//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

 import axios from "axios";
const uri = "http://localhost:5000/api/";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
// import MD5 from "crypto-js/md5";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export default {
  LOGIN: async ({ commit }, data) => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

    const res = await axios.post(`${uri}user/login`, data);
    if (res.status === 200) {
      commit("SET_USER", res.data.user);
      return res;
    } else if(res.status === 404) {
      return res.data.message;
    }
    console.log(res.status, res.data.message)


    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
    // const users = [
    //   {
    //     id: "user1",
    //     email: "manager@email.com",
    //     password: "123321",
    //     role: "manager",
    //   },
    //   {
    //     id: "user2",
    //     email: "worker@email.com",
    //     password: "123321",
    //     role: "worker",
    //   },
    //   {
    //     id: "user3",
    //     email: "operator@email.com",
    //     password: "123321",
    //     role: "operator",
    //   },
    // ];
    //
    // const user = users.find((user) => {
    //   return user.email === data.email && user.password === data.password;
    // });
    // if (user) {
    //   delete user.password;
    //   const res = { status: 200, data: MD5(user).toString() };
    //   commit("SET_USER", user);
    //   return res;
    // } else {
    //   const res = { status: 404, message: "Пользователь не найден" };
    //   return res;
    // }
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  },
  UNPROCESSED_PURSH: async () => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> РАССКОММЕНТИРОВАТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК

    // const res = await axios.post(`${uri}manager/unprocessedpursh`, data);
    // const user = res.data;

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> УДАЛИТЬ, КОГДА БУДЕТ РАБОТАТЬ БЕК
    const res = {
      data: [
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
      ],
    };
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    return res.data;
  },
};

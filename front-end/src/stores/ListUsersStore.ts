import { defineStore } from "pinia";
import { reactive } from "vue";
import { api } from "../services/api";

export const listUsersStore = defineStore("listUsersStore", () => {
  let listUsers = reactive([]);

  const perfils = ["wallysonn", "diego3g", "filipedeschamps", "rmanguinho"];

  function getListUsers() {
    perfils.forEach((perfil) => {
      const user = listUsers.filter((item) => {
        return item.login.includes(perfil);
      });

      if (user.length == 0) {
        api.get("users/" + perfil).then((res) => {
          listUsers.push(res.data);
        });
      }
    });
  }

  return {
    listUsers,
    getListUsers,
  };
});

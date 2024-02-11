import { defineStore } from "pinia";
import { api } from "../services/api";
import { serverApi } from "../services/serverApi";

export const userStore = defineStore("userStore", () => {
  async function getUser(login) {
      return await api.get("users/" + login).then((res) => {
        return res.data
      });
  }

  async function getUserRepos(login) {
     return await api.get("users/" + login+"/repos").then((res) => {
        return res.data
    });
  }

  async function saveUser(login) {
    return await serverApi.get("salvar-local/" + login).then((res) => {
       return res.data
   });
 }

  return {
    getUser,
    getUserRepos,
    saveUser
  };
});

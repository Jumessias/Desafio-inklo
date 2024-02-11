<script>
import { listUsersStore } from "/src/stores/ListUsersStore";
import {ref, computed} from 'vue';
import moment from 'moment';

export default {
  setup() {
    const filter_users = ref("");
    const listUsersData = listUsersStore();
    listUsersData.getListUsers();

    const formate_date = (value) => {
      return moment(String(value)).format('DD/MM/YYYY')
    }

    const users = computed(() => {
      return listUsersData.listUsers.filter(item => {
        return item.name && item.name.toLowerCase().includes(filter_users.value.toLowerCase());
      });
    });

    return {
      filter_users: filter_users,
      users: users,
      formate_date: formate_date
    };
  },
};
</script>

<template>
  <main class="container mt-5">
    <h3 class="mb-4 text-center">Lista de Usuários</h3>
    <div class="row justify-content-md-center mb-4">
      <form class="col-12 col-md-6">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Pesquisar"
          aria-label="Pesquisar"
          v-model="filter_users"
        />
      </form>
    </div>
    <div class="row justify-content-md-center">
      <section class="col-12 col-md-6">
        <article
          class="card bg-light p-3 card-hover mb-3"
          v-for="user in users"
          :key="user.id"
          @click="$router.push(`/user/${user.login}`)"
        >
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <img
                class="rounded-circle"
                :src="user.avatar_url"
                :alt="user.name"
                width="60"
              />
            </div>
            <div class="flex-grow-1 ms-3">
              <div class="d-flex align-items-center justify-content-between">
                <p class="mb-0 pb-0">
                  <strong>{{user.name}}</strong><br />
                  Usuário desde: <strong>{{formate_date(user.created_at)}}</strong>
                </p>
                <strong>{{user.public_repos}}</strong>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped>
.card-hover {
  transition: ease 0.2s;
  cursor: pointer;
}
.card-hover:hover {
  background: #d5aed6 !important;
}
</style>

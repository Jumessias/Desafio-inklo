<script>
import {useRoute} from 'vue-router';
import { userStore } from "/src/stores/UserStore";
import {ref, computed, onBeforeMount, onMounted} from 'vue';
import moment from 'moment';
import Swal from 'sweetalert2'

export default {
  setup(){
    const filter_repository = ref("");
    const router = useRoute();
    const login = router.params.login;

    const userData = userStore();
    
    const user_data = ref(null)
    userData.getUser(login).then(item=>{
      user_data.value = item
    })

    const repositorys = ref([])
    userData.getUserRepos(login).then(item=>{
      repositorys.value = item
    })

    const data_repositorys = computed(() => {
      return repositorys.value.filter(item => {
        return item.name && item.name.toLowerCase().includes(filter_repository.value.toLowerCase());
      });
    });

    const formate_date = (value) => {
      return moment(String(value)).format('DD/MM/YYYY')
    }

    const saveUserData = ()=>{
      Swal.fire({
        title: 'Aguarde!',
        icon: 'info',
        text: 'Processando dados!',
        showConfirmButton: false,
      });
      userData.saveUser(login).then(item =>{
        Swal.fire({
          title: 'Sucesso!',
          icon: 'success',
          text: 'Dados do usuário salvos com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      })
    }

    return {
      user: user_data,
      repositorys: data_repositorys,
      formate_date,
      filter_repository,
      saveUserData
    };
  }
}
</script>

<template>
  <div class="container mt-5" v-if="user != null">
    <div class="row">
      <div class="col-12 col-md-12 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <img
                class="rounded-circle"
                :src="user.avatar_url"
                :alt="user.name"
                width="100"
              />
            </div>
            <div class="text-center"><strong>{{user.name}}</strong></div>
            <ul class="list-group mt-3">
              <li class="list-group-item"><strong>Biografia:</strong> {{user.bio}}</li>
              <li class="list-group-item"><strong>Data de registro:</strong> {{formate_date(user.created_at)}}</li>
              <li class="list-group-item"><strong>Blog:</strong> {{user.blog}}</li>
              <li class="list-group-item"><strong>Compania:</strong> {{user.company}}</li>
              <li class="list-group-item"><strong>E-mail:</strong> {{user.email}}</li>
              <li class="list-group-item"><strong>Localização:</strong> {{user.location}}</li>
            </ul>

            <button class="btn btn-info mt-3 w-100 text-white" @click="saveUserData()">Salvar Informações</button>

          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-lg-8">
        <div class="w-100 mb-3 d-flex justify-content-between">
          <h3>Lista de repositórios</h3>
          <button @click="$router.push('/')" class="btn btn-light text-info">Voltar</button>
        </div>
        <div class="w-100 mb-3">
          <form class="w-100">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              v-model="filter_repository"
            />
          </form>
        </div>
        <div class="card mb-3" v-for="repository in repositorys" :key="repository.id">
          <div class="card-body">
            <strong>{{repository.name}}</strong> | <span class="badge bg-info">{{repository.private ? 'Privado' : 'Público'}}</span>
            <p>{{repository.description}}</p>
            <div class="d-flex justify-content-between">
              <small>Linguagem: {{repository.language}}</small>
              <small>Licença: {{repository.license?.name}}</small>
              <small>Data de criação: {{formate_date(repository.created_at)}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

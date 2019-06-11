<template>
  <div id="dashboard">
    <div id="nav">
      <router-link to="/app">Início</router-link> |
      <router-link to="/app/monitoria">Monitoria</router-link> |
      <router-link to="/app/horarios">Horários</router-link> |
      <router-link to="/app/atendimentos">Atendimentos</router-link> |
      <router-link to="/app/relatorios">Relatórios</router-link> |
      <a @click="signOut" href="#">Sair</a>
    </div>
    <router-view :parentData="firebase"/>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'dashboard',
  components: {
  },
  props: {
    parentData: Object
  },
  data() {
    return {
      firebase: this.parentData
    }
  },
  methods: {
    signOut: function() {
      this.firebase.auth().signOut().then(function() {
        router.replace('login');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Erro ' + errorCode + ': ' + errorMessage);
      });
    }
  }
}
</script>

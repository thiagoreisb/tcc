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
    <classes :classrooms="test"></classes>
    <router-view :parentData="firebase"/>
  </div>
</template>

<script>
import Classes from '../components/Classes'

export default {
  name: 'dashboard',
  components: {
    Classes
  },
  props: {
    parentData: Object,
    apiData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      api: this.apiData,
      test: []
    }
  },
  created() {
    this.api.get('classrooms', (res) => this.test = res, (res) => this.test = res);
  },
  methods: {
    signOut: function() {
      /// Get this reference
      let _this = this;

      this.firebase.auth().signOut().then(function() {
        _this.$router.replace('login');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Erro ' + errorCode + ': ' + errorMessage);
      });
    }
  }
}
</script>

<template>
  <div id="dashboard">
    <div id="nav" v-if="user !== null">
      <router-link to="/app">Início</router-link> |
      <span v-if="user.type"><router-link to="/app/monitoria">Monitoria</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE"><router-link to="/app/horarios">Horários</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE"><router-link to="/app/atendimentos">Atendimentos</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE"><router-link to="/app/presenca">Presenças</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE || user.type == constants.COORDINATOR_TYPE"><router-link to="/app/relatorios">Relatórios</router-link> | </span>
      <a @click="signOut" href="#">Sair</a>
    </div>
    <router-view :apiData="api" :userData="user" v-on:load="onLoading"/>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import constants from '../utils/constants'
import Loading from '../components/Loading'

export default {
  name: 'dashboard',
  components: {
    Loading
  },
  props: {
    parentData: Object,
    apiData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      api: this.apiData,
      user: null,
      constants: constants,
      loading: false
    }
  },
  created() {
    const db = this.firebase.database();
    const ref = db.ref('roles/' + this.firebase.auth().currentUser.uid);
    const _this = this;
    
    ref.on("value", function(snapshot) {
      _this.user = snapshot.val();
    }, function(err) {
      console.log(err);
    });
  },
  methods: {
    onLoading: function (isLoading) {
      this.loading = isLoading;
    },
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

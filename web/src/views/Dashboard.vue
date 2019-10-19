<template>
  <div id="dashboard">
    <div id="nav" v-if="user !== null">
      <router-link to="/app">Início</router-link> |
      <span v-if="user.type"><router-link to="/app/monitoria">Contratos</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE"><router-link to="/app/horarios">Grade</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE"><router-link to="/app/atendimentos">Atendimentos</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE"><router-link to="/app/presenca">Presenças</router-link> | </span>
      <span v-if="user.type == constants.MONITOR_TYPE || user.type == constants.ADVISOR_TYPE || user.type == constants.COORDINATOR_TYPE"><router-link to="/app/relatorios">Relatórios</router-link> | </span>
      <span v-if="user.type == constants.ADMIN_TYPE"><router-link to="/app/users">Usuários</router-link> | </span>
      <a @click="signOut" href="#">Sair</a>
    </div>
    <router-view :apiData="api" :userData="user" v-on:load="onLoading" v-on:toast="onToast"/>
    <loading :loading="loading"></loading>
    <toast :title="toastTitle" :body="toastBody" :toastType="toastType"></toast>
  </div>
</template>

<script>
import constants from '../utils/constants'
import Loading from '../components/Loading'
import Toast from "../components/Toast"

export default {
  name: 'dashboard',
  components: {
    Loading,
    Toast
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
      loading: false,
      toastTitle: "",
      toastBody: "",
      toastType: 1
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
    onToast: function (type, body, title="") {
      this.toastType = type;
      this.toastBody = body;
      this.toastTitle = title;
      $(".toast").toast("show");
    },
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

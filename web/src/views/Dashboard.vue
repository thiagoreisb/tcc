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
    <router-view :parentData="firebase" :apiData="api" :userData="user"/>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  props: {
    parentData: Object,
    apiData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      api: this.apiData,
      user: null
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

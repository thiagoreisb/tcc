<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    <button @click="signOut" class="btn btn-primary">Sair</button>
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

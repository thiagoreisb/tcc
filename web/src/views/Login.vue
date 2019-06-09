<template>
  <div id="login">
    <img alt="Vue logo" src="../assets/logo.png">

    <div class="container shadow p-3 mb-5 bg-white rounded">
      <form>
        <div class="container">
          <div class="row justify-content-center">
            <div class="form-group col-9 col-md-6">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" v-model="userEmail" id="userEmail" aria-describedby="emailHelp" placeholder="Digite seu email">
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="form-group col-9 col-md-6">
              <label for="exampleInputPassword1">Senha</label>
              <input type="password" class="form-control" v-model="userPassword" id="userPassword" placeholder="Digite sua senha">
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="form-check col-9 col-md-6">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Lembrar</label>
            </div>
          </div>

          <div class="row justify-content-center mt-2">
            <div class="form-check col-9 col-md-6">
              <button @click="signIn" type="submit" class="btn btn-primary">Entrar</button>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  props: {
    parentData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      userEmail: '',
      userPassword: ''
    }
  },
  methods: {
    signIn: function() {
      this.firebase
        .auth()
        .signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then(
          function(user) {
            alert('Usuário logado!');
            //window.location.href = '/monitoria';
          },
          function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Erro ' + errorCode + ': ' + errorMessage);
          }
        );
    },
    signOut: function() {
      this.firebase.auth().signOut().then(function() {
        alert('Deslogado com sucesso!');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Erro ' + errorCode + ': ' + errorMessage);
      });
    }
  }
}
</script>

<style></style>

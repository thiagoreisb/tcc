<template>
  <div id="users" class="container">
    <h1>{{pageTitle}}</h1>
    <div class="col">
      <div class="card">
          <div class="card-header">Novo Usuário</div>
          <div class="card-body">
            <div class="col-sm-12">
              <!-- Nome -->
              <div class="form-group row">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="newUserNameInput">Nome</span>
                  </div>
                  <input type="text" maxlength="20" class="form-control" v-model="newUser.name">
                </div>
              </div>
              <!-- Email -->
              <div class="form-group row">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="newUserEmailInput">E-mail</span>
                  </div>
                  <input type="text" maxlength="30" class="form-control" v-model="newUser.email">
                </div>
              </div>
              <!-- Senha -->
              <div class="form-group row">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="newUserEmailInput">Senha</span>
                  </div>
                  <input type="password" maxlength="20" class="form-control" v-model="newUser.password">
                </div>
              </div>
              <!-- Confirmar Senha -->
              <div class="form-group row">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="newUserEmailInput">Confirmar senha</span>
                  </div>
                  <input type="password" maxlength="20" class="form-control" v-model="newUser.passwordCheck">
                </div>
              </div>
              <!-- Monitor/Orientador -->
              <div class="form-group row">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="newUserTypeInput">Tipo</span>
                  </div>
                  <select class="custom-select" v-model="newUser.type">
                    <option value="0">Estudante</option>
                    <option value="1">Professor</option>
                  </select>
                </div>
              </div>
              <!-- Curso -->
              <div class="form-group row" v-if="newUser.type != undefined && newUser.type != 1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="newUserCursoInput">Curso</span>
                  </div>
                  <select class="custom-select" v-model="id_course">
                    <option
                      v-for="c in loadCourses"
                      v-bind:key="c.id"
                      v-bind:value="c.id">
                      {{c.name}}
                    </option>
                  </select>
                </div>
              </div>

            </div>

          </div>
          <!-- Adicionar novo usuário -->
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-6">
                <button id="addUserButton" v-on:click="addUser()" class="btn btn-primary" :disabled="!isDataRight()">Adicionar</button>
              </div>
              <div class="col-sm-6">
                <button id="cleanUserFieldsButton" v-on:click="cleanFields()" class="btn btn-secondary">Limpar</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import constants from '../utils/constants'
import Api from '../controllers/apiController'
import FB from '../utils/fb'

export default {
  name: 'users',
  components: {
  },
  props: {
    userData: Object
  },
  data() {
    return {
      api: Api,
      constants: constants,
      pageTitle: 'Usuários',
      user: this.userData,
      newUser: {},
      courses: {},
      id_course: null,
      fb: FB,
      fb2: {}
    }
  },
  computed: {
    loadCourses() {
      if(Object.keys(this.courses).length === 0 && this.courses.constructor === Object && this.newUser.type == 0) {
        this.load(true)
        this.api.get2('courses')
        .then((data) => this.courses = data.data.status)
        .catch((err) => this.toast(2, 'Erro ao carregar dados!'))
        .finally(() => this.load(false));
      }
      return this.courses
    }
  },
  methods: {
    toast: function (type, body, title="") {
      this.$emit('toast', type, body, title);
    },
    load: function (value) {
      this.$emit('load', value);
    },
    addUser: function () {
      if (this.isDataRight()) {
        if (this.newUser.password !== this.newUser.passwordCheck) {
          this.toast(3, 'Senhas devem ser iguais!')
        } else {
        }
      } else {
        this.toast(2, "Preencha todos os campos corretamente!");
      }
    },
    cleanFields: function () {
      this.newUser = {};
    },
    isDataRight: function() {
      if (this.isNullOrEmpty(this.newUser.name) || this.isNullOrEmpty(this.newUser.email) ||
          this.isNullOrEmpty(this.newUser.type) || (this.newUser.type != 1 && this.isNullOrEmpty(this.id_course)) ||
          (!this.isNullOrEmpty(this.newUser.email) && !this.validateEmail(this.newUser.email)) ||
          this.isNullOrEmpty(this.newUser.password) || this.isNullOrEmpty(this.newUser.passwordCheck)){
        return false;
      }
      return true;
    },
    isNullOrEmpty: function (value) {
      if (value === undefined || value === null || value === '') {
        return true;
      }
      return false;
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  created() {
    /// Gets a second instance for firebase
    let ref = this.fb.apps;
    if (!(ref.length > 1 && ref[1].name == 'second')) {
      this.fb2 = this.fb.initializeApp(ref[0].options, 'second');
    } else {
      this.fb2 = ref[1];
    }
  }
}
</script>

<template>
  <div id="users">
    <h1>{{pageTitle}}</h1>
  </div>
</template>

<script>
import constants from '../utils/constants'
import Api from '../controllers/apiController'

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
      pageTitle: 'Novo Usuário',
      user: this.userData
    }
  },
  methods: {
    load: function (value) {
      this.$emit('load', value);
    }
  },
  created() {
  }
}
</script>

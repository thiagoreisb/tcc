<template>
  <div id="app">
    <div id="nav" v-if="!this.$route.path.includes('/app')">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/about">Sobre</router-link>
    </div>
    <router-view :parentData="firebase" :apiData="api"/>
  </div>
</template>

<script>
import route from './router'

export default {
  props: {
    serverData: Object,
    apiController: Object
  },
  data() {
    return {
      firebase: this.serverData,
      api: this.apiController
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

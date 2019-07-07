<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <schedules :schedules="schedules" :ready="status"></schedules>
  </div>
</template>

<script>
import Schedules from '../components/Schedules'

export default {
  name: 'home',
  components: {
    Schedules
  },
  props: {
    apiData: Object
  },
  data() {
    return {
      api: this.apiData,
      schedules: [],
      status: false
    }
  },
  created() {
    this.api.get('schedules', (res) => {this.status = true; this.schedules = res.status;}, (res) => this.schedules = res);
  }
}
</script>

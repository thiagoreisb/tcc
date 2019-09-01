<template>
  <div id="attendance">
    <h1>Atendimentos</h1>
    <attendances :atendimentos="attendances" :ready="status_atend"></attendances>
    <br>
    {{frequencies}}
  </div>
</template>

<script>
import Attendances from '../components/Attendances'

export default {
  name: 'attendance',
  components: {
    Attendances
  },
  props: {
    parentData: Object,
    apiData: Object,
    userData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      api: this.apiData,
      user: this.userData,
      attendances: [],
      frequencies: [],
      status_atend: false,
      status_freq: false
    }
  },
  created() {
    this.api.get('attendance/from/person/' + this.user.id, (res) => {this.attendances = res; this.status_atend = true;}, (res) => this.attendances = res);
    this.api.get('frequency/from/person/' + this.user.id, (res) => {this.frequencies = res; this.status_freq = true;}, (res) => this.frequencies = res);
  }
}
</script>

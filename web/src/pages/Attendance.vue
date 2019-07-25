<template>
  <div id="attendance">
    <h1>Atendimentos</h1>
    {{attendances}}
    <br>
    {{frequencies}}
  </div>
</template>

<script>
export default {
  name: 'attendance',
  components: {
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

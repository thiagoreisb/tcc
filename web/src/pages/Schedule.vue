<template>
  <div id="schedule">
    <h1>Horários</h1>
    <horarios :horarios="horarios" :ready="status"></horarios>
  </div>
</template>

<script>
import Horarios from '../components/Horarios'

export default {
  name: 'schedule',
  components: {
    Horarios
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
      horarios: [],
      status: false
    }
  },
  created() {
    this.api.get('schedules/from/person/' + this.user.id, (res) => {this.horarios = res; this.status = true;}, (res) => this.horarios = res);
  }
}
</script>

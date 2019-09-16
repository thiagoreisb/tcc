<template>
  <div id="schedule">
    <h1>Horários</h1>
    <horarios :horarios="horarios" :ready="status" :userData="user"></horarios>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import Horarios from '../components/Horarios'
import Loading from '../components/Loading'
import Api from '../controllers/apiController'

export default {
  name: 'schedule',
  components: {
    Horarios,
    Loading
  },
  props: {
    parentData: Object,
    userData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      api: Api,
      user: this.userData,
      horarios: [],
      status: false,
      loading: false
    }
  },
  created() {
    this.loading = true;
    this.api.get('schedules/from/person/' + this.user.id,
    (res) => {
      this.horarios = res;
      this.status = true;
      this.loading = false;
    }, (res) => {
      // show error
      this.loading = false;
    });
  }
}
</script>

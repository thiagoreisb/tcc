<template>
  <div id="schedule">
    <h1>Horários</h1>
    <horarios :horarios="horarios" :ready="status" :userData="user" v-on:load="load" v-on:toast="toast"></horarios>
  </div>
</template>

<script>
import Horarios from '../components/Horarios'
import Api from '../controllers/apiController'

export default {
  name: 'schedule',
  components: {
    Horarios
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
      status: false
    }
  },
  methods: {
    toast: function (type, body, title="") {
      this.$emit('toast', type, body, title);
    },
    load: function (value) {
      this.$emit('load', value);
    }
  },
  created() {
    this.load(true);
    this.api.get('schedules/from/person/' + this.user.id,
    (res) => {
      this.horarios = res;
      this.status = true;
      this.load(false);
    }, (res) => {
      // show error
      this.load(false);
    });
  }
}
</script>

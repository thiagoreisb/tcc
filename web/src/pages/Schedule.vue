<template>
  <div id="schedule">
    <h1>Horários</h1>
    {{horarios}}
  </div>
</template>

<script>
export default {
  name: 'schedule',
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
      horarios: []
    }
  },
  created() {
    this.api.get('schedules/from/person/' + this.user.id, (res) => this.horarios = res, (res) => this.horarios = res);
  }
}
</script>

<template>
  <div id="schedule">
    <h1>Horários</h1>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  components: {
  },
  props: {
    parentData: Object
  },
  data() {
    return {
      firebase: this.parentData
    }
  },
  methods: {
    //
  }
}
</script>

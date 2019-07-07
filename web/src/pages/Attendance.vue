<template>
  <div id="attendance">
    <h1>Atendimentos</h1>
  </div>
</template>

<script>
export default {
  name: 'attendance',
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

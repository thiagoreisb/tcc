<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
  },
  props: {
    parentData: Object
  },
  data() {
    return {
      firebase: this.parentData
    }
  }
}
</script>

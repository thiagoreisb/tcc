<template>
  <div id="report">
    <h1>Relatórios</h1>
  </div>
</template>

<script>
export default {
  name: 'report',
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

<template>
  <div id="contract">
    <h1>Termos</h1>
  </div>
</template>

<script>
export default {
  name: 'contract',
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

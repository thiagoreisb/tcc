<template>
  <div id="contract">
    <h1>Termos</h1>
    {{termos}}
  </div>
</template>

<script>
export default {
  name: 'contract',
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
      termos: []
    }
  },
  methods: {
    //
  },
  created() {
    this.api.get('monitoring/all/my/' + this.user.id, (res) => this.termos = res, (res) => this.termos = res);
  }
}
</script>

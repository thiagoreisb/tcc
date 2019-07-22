<template>
  <div id="contract">
    <h1>Termos</h1>
    <termos :termos="termos" :ready="status"></termos>
  </div>
</template>

<script>
import Termos from '../components/Termos'

export default {
  name: 'contract',
  components: {
    Termos
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
      termos: [],
      status: false
    }
  },
  methods: {
    //
  },
  created() {
    this.api.get('monitoring/all/my/' + this.user.id, (res) => {this.status = true; this.termos = res;}, (res) => this.termos = res);
  }
}
</script>

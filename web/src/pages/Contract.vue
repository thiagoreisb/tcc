<template>
  <div id="contract">
    <h1>Termos</h1>
    <monitoring v-if="user.type == constants.ADMIN_TYPE" :apiData="api"></monitoring>
    <termos v-else :termos="termos" :ready="status"></termos>
  </div>
</template>

<script>
import Termos from '../components/Termos'
import Monitoring from '../components/Monitoring'
import Constants from '../utils/constants'

export default {
  name: 'contract',
  components: {
    Termos,
    Monitoring
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
      status: false,
      constants: Constants
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

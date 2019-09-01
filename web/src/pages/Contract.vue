<template>
  <div id="contract">
    <h1>Termos</h1>
    <monitoring v-if="user.type == constants.ADMIN_TYPE" :apiData="api"></monitoring>
    <termos v-else :termos="termos" :ready="status"></termos>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import Termos from '../components/Termos'
import Monitoring from '../components/Monitoring'
import Constants from '../utils/constants'
import Loading from '../components/Loading'
import constants from '../utils/constants';
import Api from '../controllers/apiController'

export default {
  name: 'contract',
  components: {
    Termos,
    Monitoring,
    Loading
  },
  props: {
    userData: Object
  },
  data() {
    return {
      api: Api,
      user: this.userData,
      termos: [],
      status: false,
      constants: Constants,
      loading: false
    }
  },
  methods: {
    //
  },
  created() {
    if (this.user.type != constants.ADMIN_TYPE) {
      this.loading = true;
      this.api.get('monitoring/all/my/' + this.user.id,
      (res) => {
        this.status = true;
        this.termos = res;
        this.loading = false;
      }, (res) => {
        // show error
        this.loading = false;
      });
    }
  }
}
</script>

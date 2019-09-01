<template>
  <div id="report">
    <h1>Relatórios</h1>

    <reports :reports="reports"></reports>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import Reports from '../components/Reports'
import Loading from '../components/Loading'
import Api from '../controllers/apiController'

export default {
  name: 'report',
  components: {
    Loading,
    Reports
  },
  props: {
    parentData: Object,
    userData: Object
  },
  data() {
    return {
      firebase: this.parentData,
      api: Api,
      user: this.userData,
      reports: [],
      loading: false
    }
  },
  created() {
    this.loading = true;
    this.api.get('report/actual/my/' + this.user.id,
    (res) => {
      this.reports = res;
      this.loading = false;
    }, (res) => {
      // show error
      this.loading = false;
    });
  }
}
</script>

<template>
  <div id="report">
    <h1>Relatórios</h1>

    <reports :reports="reports"></reports>
  </div>
</template>

<script>
import Reports from '../components/Reports'

export default {
  name: 'report',
  components: {
    Reports
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
      reports: []
    }
  },
  created() {
    this.api.get('report/all/my/' + this.user.id, (res) => this.reports = res, (res) => this.reports = res);
  }
}
</script>

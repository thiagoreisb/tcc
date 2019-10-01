<template>
  <div id="report">
    <h1>Relatórios</h1>

    <reports :reports="reports" v-on:load="load" v-on:toast="toast"></reports>
  </div>
</template>

<script>
import Reports from '../components/Reports'
import Api from '../controllers/apiController'

export default {
  name: 'report',
  components: {
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
      reports: []
    }
  },
  methods: {
    toast: function (type, body, title="") {
      this.$emit('toast', type, body, title);
    },
    load: function (value) {
      this.$emit('load', value);
    }
  },
  created() {
    this.load(true);
    this.api.get('report/actual/my/' + this.user.id,
    (res) => {
      this.reports = res;
      this.load(false);
    }, (res) => {
      // show error
      this.load(false);
    });
  }
}
</script>

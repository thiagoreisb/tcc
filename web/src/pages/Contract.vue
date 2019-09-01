<template>
  <div id="contract">
    <h1>{{pageTitle}}</h1>
    <button v-if="backStatus" @click="comeBack" class="btn btn-primary">Voltar</button>
    <monitoring v-if="user.type == constants.ADMIN_TYPE" :apiData="api"></monitoring>
    <termos v-else :termos="termos" :ready="termosStatus" v-on:open-schedule="openSchedule"></termos>
    <horarios v-if="horariosStatus" :horarios="horarios" :ready="horariosStatus"></horarios>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import constants from '../utils/constants'
import Loading from '../components/Loading'
import Api from '../controllers/apiController'

export default {
  name: 'contract',
  components: {
    Termos: () => import('../components/Termos'),
    Monitoring: () => import('../components/Monitoring'),
    Horarios: () => import('../components/Horarios'),
    Loading
  },
  props: {
    userData: Object
  },
  data() {
    return {
      api: Api,
      constants: constants,
      pageTitle: 'Contratos',
      user: this.userData,
      termos: [],
      horarios: null,
      termosStatus: false,
      horariosStatus: false,
      backStatus: false,
      loading: false
    }
  },
  methods: {
    comeBack: function() {
      this.horariosStatus = false;
      this.termosStatus = true;
      this.pageTitle = 'Contratos'
      this.backStatus = false;
    },
    openSchedule: function(contractID) {
      this.loading = true;
      this.pageTitle = 'Plano de Trabalho';
      this.api.get(
        'schedules/from/contract/' + contractID,
        (res) => {
          // hide 'Termos'
          this.termosStatus = false;
          // shows 'Horarios'
          this.horarios = res;
          this.horariosStatus = true;
          
          this.backStatus = true;
          this.loading = false;
        },
        (err) => {
          //
          this.loading = false;
        });
    },
    openContracts: function() {
      this.loading = true;
      this.api.get('monitoring/all/my/' + this.user.id,
      (res) => {
        this.termosStatus = true;
        this.termos = res;
        this.loading = false;
      }, (res) => {
        // show error
        this.loading = false;
      });
    }
  },
  created() {
    if (this.user.type != constants.ADMIN_TYPE) {
      this.openContracts();
    }
  }
}
</script>

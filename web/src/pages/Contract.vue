<template>
  <div id="contract">
    <h1>{{pageTitle}}</h1>
    <button v-if="backStatus" @click="comeBack" class="btn btn-primary">Voltar</button>
    <monitoring v-if="user.type == constants.ADMIN_TYPE" :apiData="api" v-on:load="load" v-on:toast="toast"></monitoring>
    <termos v-else :termos="termos" :ready="termosStatus" v-on:open-schedule="openSchedule"></termos>
    <horarios v-if="horariosStatus" :horarios="horarios" :ready="horariosStatus"></horarios>
  </div>
</template>

<script>
import constants from '../utils/constants'
import Api from '../controllers/apiController'

export default {
  name: 'contract',
  components: {
    Termos: () => import('../components/Termos'),
    Monitoring: () => import('../components/Monitoring'),
    Horarios: () => import('../components/Horarios')
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
      backStatus: false
    }
  },
  methods: {
    load: function (value) {
      this.$emit('load', value);
    },
    toast: function (type, body, title="") {
      this.$emit('toast', type, body, title);
    },
    comeBack: function() {
      this.horariosStatus = false;
      this.termosStatus = true;
      this.pageTitle = 'Contratos'
      this.backStatus = false;
    },
    openSchedule: function(contractID) {
      this.load(true);
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
          this.load(false);
        },
        (err) => {
          //
          this.load(false);
        });
    },
    openContracts: function() {
      this.load(true);
      this.api.get('monitoring/all/my/' + this.user.id,
      (res) => {
        if (res.status) {
          this.termosStatus = true;
          this.termos = res;
        }
        this.load(false);
      }, (res) => {
        // show error
        this.load(false);
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

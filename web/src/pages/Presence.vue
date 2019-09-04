<template>
  <div>
    <h1>Controle de Presença</h1>
    <div>
      <button @click="changeRefMonth(false)">&lt;</button> {{nameMonth}} <button @click="changeRefMonth(true)">&gt;</button>
    </div>
    {{frequencies}}
    <div class="col-12">
      <div v-for="n in 4" v-bind:key="n" class="row">
        <work-day v-for="i in 5" v-bind:key="i" class="col"></work-day>
      </div>
    </div>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Api from "../controllers/apiController";
import WorkDay from "../components/WorkDay"

export default {
  name: "presence",
  components: {
    Loading,
    WorkDay
  },
  props: {
    userData: Object
  },
  data() {
    return {
      user: this.userData,
      api: Api,
      frequencies: null,
      status_freq: false,
      refMonth: null,
      nameMonth: '',
      loading: false
    };
  },
  methods: {
    changeRefMonth: function(isAdding) {
      if (isAdding && this.refMonth.getMonth() < 11) {
        this.refMonth.setMonth(this.refMonth.getMonth() + 1);
      } else if (!isAdding && this.refMonth.getMonth() > 0) {
        this.refMonth.setMonth(this.refMonth.getMonth() - 1);
      }
      this.getMonth();
      this.getFrequency();
    },
    getMonth: function() {
      switch (this.refMonth.getMonth()) {
        case 0:
          this.nameMonth = 'Janeiro';
          break;
        case 1:
          this.nameMonth = 'Fevereiro';
          break;
        case 2:
          this.nameMonth = 'Março';
          break;
        case 3:
          this.nameMonth = 'Abril';
          break;
        case 4:
          this.nameMonth = 'Maio';
          break;
        case 5:
          this.nameMonth = 'Junho';
          break;
        case 6:
          this.nameMonth = 'Julho';
          break;
        case 7:
          this.nameMonth = 'Agosto';
          break;
        case 8:
          this.nameMonth = 'Setembro';
          break;
        case 9:
          this.nameMonth = 'Outubro';
          break;
        case 10:
          this.nameMonth = 'Novembro';
          break;
        case 11:
          this.nameMonth = 'Dezembro';
          break;
        default:
          this.nameMonth = 'Erro!';
          break;
      }
    },
    getFrequency: function() {
      let m = this.refMonth.getMonth() + 1;
      let d = this.refMonth.getDate();

      let when = this.refMonth.getFullYear() + '-'
        + (m < 10 ? '0' + m : m) + '-'
        + (d < 10 ? '0' + d : d);

      this.loading = true;
      this.api.get(
        'frequency/from/person/' + this.user.id + '?date=' + when,
        res => {
          this.frequencies = res;
          this.status_freq = true;
          this.loading = false;
        },
        res => {
          this.frequencies = res;
          this.loading = false;
        }
      );
    }
  },
  created() {
    this.refMonth = new Date();
    this.getMonth();

    this.getFrequency();
  }
};
</script>

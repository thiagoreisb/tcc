<template>
  <div id="attendance">
    <h1>Atendimentos</h1>
    <div>
      <button @click="changeRefMonth(false)">&lt;</button> {{nameMonth}} <button @click="changeRefMonth(true)">&gt;</button>
    </div>
    <attendances :atendimentos="attendances" :ready="status_atend"></attendances>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import Attendances from '../components/Attendances'
import Loading from '../components/Loading'

export default {
  name: 'attendance',
  components: {
    Attendances,
    Loading
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
      attendances: [],
      frequencies: [],
      status_atend: false,
      status_freq: false,
      refMonth: null,
      nameMonth: '',
      loading: false
    }
  },
  methods: {
    changeRefMonth: function(isAdding) {
      if (isAdding && this.refMonth.getMonth() < 11) {
        this.refMonth.setMonth(this.refMonth.getMonth() + 1);
      } else if (!isAdding && this.refMonth.getMonth() > 0) {
        this.refMonth.setMonth(this.refMonth.getMonth() - 1);
      }
      this.getMonth();
      this.getAttendance();
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
    getAttendance: function() {
      let m = this.refMonth.getMonth() + 1;
      let d = this.refMonth.getDate();

      let when = this.refMonth.getFullYear() + '-'
        + (m < 10 ? '0' + m : m) + '-'
        + (d < 10 ? '0' + d : d);

      this.loading = true;
      this.api.get(
        'attendance/from/person/' + this.user.id + '?date=' + when,
        (res) => {
          this.attendances = res;
          this.status_atend = true;
          this.loading = false;
        },
        (res) => {
          this.attendances = res;
          this.loading = false;
        }
      );
    }
  },
  created() {
    this.refMonth = new Date();
    this.getMonth();
    
    this.getAttendance();
  }
}
</script>

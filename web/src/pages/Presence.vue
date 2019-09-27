<template>
  <div>
    <h1>Controle de Presença</h1>
    <div>
      <button @click="changeRefMonth(false)">&lt;</button> {{nameMonth}} <button @click="changeRefMonth(true)">&gt;</button>
    </div>
    <div class="col-12">
      <!-- Header -->
      <div class="row no-gutters fixed-min-width"><div v-for="i in 7" v-bind:key="i" class="col">{{weekDay(i)}}</div></div>
      <!-- Calendar -->
      <div v-for="i in calendar.length" v-bind:key="i" class="row no-gutters fixed-min-width">
        <work-day v-for="j in calendar[i-1]" v-bind:key="j[0].actual_date" :dayRef="j"
        :month="refMonth.getMonth()" :isUserMonitor="user.type == c.MONITOR_TYPE" class="col"
        :horarios="horarios" v-on:load="load" v-on:toast="toast" v-on:reload-frequency="getFrequency"></work-day>
      </div>
    </div>
  </div>
</template>

<script>
import Constantes from "../utils/constants"
import Api from "../controllers/apiController"
import WorkDay from "../components/WorkDay"
import DT from "../utils/dt"

export default {
  name: "presence",
  components: {
    WorkDay
  },
  props: {
    userData: Object
  },
  data() {
    return {
      c: Constantes,
      user: this.userData,
      api: Api,
      frequencies: null,
      horarios: null,
      status_freq: false,
      refMonth: null,
      nameMonth: '',
      calendar: [],
      dt: new DT()
    };
  },
  methods: {
    toast: function (type, body, title="") {
      this.$emit('toast', type, body, title);
    },
    load: function (value) {
      this.$emit('load', value);
    },
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

      this.load(true);
      // Horários da grade
      this.api.get(
        'schedules/from/person/' + this.user.id,
        (res) => {
          this.horarios = res;
          // Frequências
          this.api.get(
            'frequency/from/person/' + this.user.id + '?date=' + when,
            res => {
              if (res.status != undefined && res.status != null) {
                this.frequencies = res;
                this.status_freq = true;
                this.getCalendar();
                this.load(false);
              }
            },
            res => {
              this.load(false);
            }
          );
        }, (res) => {
          // show error
          this.load(false);
      });
    },
    weekDay(value) {
      switch (value) {
        case 1:
          return 'Domingo'
          break;
        case 2:
          return 'Segunda'
          break;
        case 3:
          return 'Terça'
          break;
        case 4:
          return 'Quarta'
          break;
        case 5:
          return 'Quinta'
          break;
        case 6:
          return 'Sexta'
          break;
        default:
          return 'Sábado'
          break;
      }
    },
    getCalendar: function() {
      // Cleans calendar
      this.calendar = new Array();

      let d = new Date();
      d.setMonth(this.refMonth.getMonth());
      d.setHours(5);
      let lastDay = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
      let m = [];

      // Adds actual month
      for (let index = 1; index <= lastDay; index++) {
        d.setDate(index);

        if(d.getDay() == 0) {
          this.calendar.push([...m]);
          m = [];
        }
        
        let eventDay = this.frequencies.status.filter( el => {
          // Normalize date
          el.actual_date = this.dt.stringToLocal(el.actual_date)
          let normDate = new Date(el.actual_date);

          if(normDate.getDate() == index && normDate.getMonth() == this.refMonth.getMonth()){
            return el;
          }
        });
        
        if (eventDay.length == 0) {
          eventDay.push({
            "actual_date": d.toString()
          });
        }
        m.push(eventDay);
      }
      if (d.getDay() == 6) {
        this.calendar.push([...m]);
        m = [];
      }

      // Gets month's end and/or just the next month's first week
      while (d.getDay() < 6) {
        d.setDate(d.getDate() + 1);
        m.push([{
          "actual_date": d.toString()
        }]);

        if (d.getDay() == 6) {
          this.calendar.push([...m]);
          m = [];
        }
      }

      // Gets the previous month's last week
      d.setFullYear(this.refMonth.getFullYear());
      d.setMonth(this.refMonth.getMonth());
      d.setDate(0);
      if (d.getDay() == 0) {
        this.calendar[0].unshift([{
          "actual_date": d.toString()
        }]);
      }
      else {
        do {
          this.calendar[0].unshift([{
            "actual_date": d.toString()
          }]);
          d.setDate(d.getDate() - 1);
          if (d.getDay() == 0) {
            this.calendar[0].unshift([{
              "actual_date": d.toString()
            }]);
          }
        } while (d.getDay() > 0);
      }
    }
  },
  created() {
    this.refMonth = new Date();
    this.getMonth();
    this.getFrequency();
  }
};
</script>

<style>
.fixed-min-width {
  min-width: 450px;
}
</style>

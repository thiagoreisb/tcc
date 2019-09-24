<template>
  <div>
    <div class="overlay" v-if="focused">
      <div class="col-6 mx-auto h-100">
        <div class="card justify-content-center">
          <h4 class="card-header">Dia {{dayTitle}}<i @click="expand" class="btn btn-secondary float-right">X</i></h4>
          <div v-if="day[0].id !== undefined">
            <div v-for="(value, index) in day" v-bind:key="index">
              <div v-if="!eventShowControl[index].show" class="card-body event-day" @click="expandEvent(index)">{{getHour(value.start)}} - {{getHour(value.end)}}</div>
              <div v-else>
                <h5 class="card-header event-day" @click="expandEvent(index)">{{getHour(value.start)}} - {{getHour(value.end)}}</h5>
                <div class="card-body">
                  <div class="col-sm-12">
                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="entranceFreq">Entrada</span>
                          </div>
                          <input type="time" class="form-control" v-model="value.start" :readonly="!isMonitor || !!value.id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="exitFreq">Saída</span>
                          </div>
                          <input type="time" class="form-control" v-model="value.end" :readonly="!isMonitor || !!value.id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="classroomFreq">Sala</span>
                          </div>
                          <input type="number" class="form-control" placeholder="Número da sala" v-model="value.classroom_id" :readonly="!isMonitor || !!value.id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="scheduleIdFreq">Horário</span>
                          </div>
                          <select class="custom-select" v-model="value.schedule_id" v-bind:disabled="!!value.id">
                            <option v-for="h in horariosDoDia"
                              v-bind:key="h.id" v-bind:value="h.id"
                              :selected="value.schedule_id == h.id">{{week_day(h.week_day)}}, {{getHour(h.start)}} - {{getHour(h.end)}}, {{activity(h.activity)}}</option>
                          </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="observationFreq">Observação</span>
                          </div>
                          <textarea class="form-control" placeholder="Ex.: Exercícios feitos" v-model="value.observation" :readonly="!isMonitor || !!value.id"></textarea>
                        </div>
                    </div>
                    <button v-if="isMonitor && saveDay && !value.id" class="btn btn-primary" @click="saveFrequency(value)">Salvar horário</button>
                    <button v-if="isMonitor && (value.id === undefined || value.id === null)" class="btn btn-primary" @click="removeFrequency(index)">Apagar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button v-if="isMonitor" class="btn btn-secondary" @click="addFrequency()">Novo horário</button>
        </div>
      </div>
    </div>
    
    <div class="card" v-bind:class="getDayCSS" v-else @click="expand">
      <h5 class="card-header">{{dayMonth}}</h5>
    </div>
    <toast :title="toastTitle" :body="toastBody" :toastType="toastType"></toast>
  </div>
</template>

<script>
import Api from "../controllers/apiController";
import Toast from "../components/Toast";
import DT from "../utils/dt"

export default {
  components: {
    Toast
  },
  props: {
    horarios: null,
    dayRef: null,
    month: null,
    isUserMonitor: null
  },
  data() {
    return {
      api: Api,
      horariosValidos: this.horarios.status.filter(el => el.situation == 1),
      dayMonth: new Date(this.dayRef[0].actual_date).getDate(),
      dayTitle: new Date(this.dayRef[0].actual_date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
      day: [...this.dayRef],
      eventShowControl: [],
      saveDay: true,
      focused: false,
      isMonitor: this.isUserMonitor,
      dt: new DT(),
      toastTitle: "",
      toastBody: "",
      toastType: 1
    };
  },
  methods: {
    isTimeRight(value) {
      if (!!value.schedule_id) {
        let h = this.horariosValidos.filter(el => el.id == value.schedule_id);
        let f = new Date(value.actual_date);

        if (Array.isArray(h) && h.length > 0 && h[0].week_day == f.getDay()) {
          let compStart = this.dt.compTime(h[0].start, value.start);
          let compEnd = this.dt.compTime(h[0].end, value.end);

          if ((compStart < 0 ? compStart * -1 : compStart)
              + (compEnd < 0 ? compEnd * -1 : compEnd) <= 15) {
            return true;
          }
        }
      }

      return false;
    },
    saveFrequency(frequency) {
      var freq = {...frequency};
      if (!!freq.id) {
        if(this.isFrequencyDataRight(freq)) {
          // Update frquency
          // TODO
        }
      } else {
        if(this.isFrequencyDataRight(freq)) {
          freq.status = this.isTimeRight(freq) ? "0" : "1";
          freq.observation = freq.observation == null ? "" : freq.observation;
          freq.actual_date = this.dt.getFullDate(freq.actual_date);

          // Insert new frequency
          this.api.post("new/frequency", freq)
            .then(res => {
              this.toastType = 1;
              this.toastBody = "Horário gravado com sucesso!"
              $(".toast").toast("show");
              // TODO: reload to show new frequency
            })
            .catch(res => {
              this.toastType = 2;
              this.toastBody = "Erro ao salvar"
              $(".toast").toast("show");
            });
        }
      }
    },
    isFrequencyDataRight(freq) {
      if (!freq.start || !freq.end) {
        return false;
      }

      if (this.dt.compareTime(freq.start, freq.end) >= 0) {
        return false;
      }

      if (freq.schedule_id == undefined || freq.schedule_id == "") {
        return false;
      }

      return true;
    },
    removeFrequency(index) {
      let hint = this.day[0].actual_date;

      this.day.splice(index, 1);
      this.eventShowControl.splice(index, 1);
      
      if (this.day.length == 0) {
        this.day.push({actual_date: hint});
      }
    },
    addFrequency() {
      let newDay = {
        actual_date: this.day[0].actual_date,
        classroom_id: null,
        end: null,
        expected_date: null,
        id: null,
        observation: null,
        schedule_id: null,
        start: null,
        status: null
      };

      if (this.day[0].id === undefined) {
        this.day.pop();
      }
      
      this.day.push(newDay);
      this.eventShowControl.push({show: false});
    },
    getHour(time) {
      if (time != undefined && time.length > 5) {
        return time.substring(0, 5);
      }
      return time;
    },
    expandEvent(value) {
      this.eventShowControl[value].show = !this.eventShowControl[value].show;
    },
    expand() {
      this.focused = !this.focused;
    },
    activity(type) {
      switch (type) {
        case 0:
          return "ATEND";
        case 1:
          return "PREP";
        case 2:
          return "ELAB";
      }
    },
    week_day(day) {
      switch (day) {
        case 0:
          return "Domingo";
        case 1:
          return "Segunda";
        case 2:
          return "Terça";
        case 3:
          return "Quarta";
        case 4:
          return "Quinta";
        case 5:
          return "Sexta";
        case 6:
          return "Sábado";
      }
    }
  },
  computed: {
    getDayCSS() {
      if (this.day[0].id != undefined) {
        return 'event-day';
      } else if (new Date(this.day[0].actual_date).getMonth() == this.month) {
        return 'actual-month';
      }else {
        return 'other-month';
      }
    },
    horariosDoDia() {
      return [...this.horariosValidos];
    }
  },
  created() {
    this.day.forEach((el, index) => this.eventShowControl.push({show: false}));
  }
};
</script>

<style>
  .overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    background-color: rgb(199, 209, 203);
    overflow-x: hidden;
    transition: 0.5s;
  }

  .other-month {
    background-color: #7f8da1;
    color: white;
  }

  .actual-month {
    background-color: #8db8f2;
    color: white;
  }

  .event-day {
    background-color: #1474f5;
    color: white;
  }
</style>

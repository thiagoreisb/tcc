<template>
  <div>
    <div class="overlay" v-if="focused">
      <div class="col-6 mx-auto h-100">
        <div class="card justify-content-center">
          <h3 class="card-header">Dia {{dayTitle}}<i @click="expand" class="btn btn-secondary float-right">X</i></h3>
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
                          <input type="time" class="form-control" v-model="value.start" :readonly="!isMonitor">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="exitFreq">Saída</span>
                          </div>
                          <input type="time" class="form-control" v-model="value.end" :readonly="!isMonitor">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="classroomFreq">Sala</span>
                          </div>
                          <input type="number" class="form-control" placeholder="Número da sala" v-model="value.classroom_id" :readonly="!isMonitor">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="observationFreq">Observação</span>
                          </div>
                          <textarea class="form-control" placeholder="Ex.: Exercícios feitos" v-model="value.observation" :readonly="!isMonitor"></textarea>
                        </div>
                    </div>
                    <button v-if="isMonitor && saveDay" class="btn btn-primary">Salvar horário</button>
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
  </div>
</template>

<script>
export default {
  props: {
    dayRef: null,
    month: null,
    isUserMonitor: null
  },
  data() {
    return {
      dayMonth: new Date(this.dayRef[0].actual_date).getDate(),
      dayTitle: new Date(this.dayRef[0].actual_date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
      day: [...this.dayRef],
      eventShowControl: [],
      saveDay: true,
      focused: false,
      isMonitor: this.isUserMonitor
    };
  },
  methods: {
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

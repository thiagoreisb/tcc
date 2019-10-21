<template>
  <div>
    <button v-if="!showEdit && !!user && user.type == constants.MONITOR_TYPE" @click="toggleEdition()" class="btn btn-primary">Adicionar</button>
    <br />
    <div v-if="showEdit" class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group row">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="entranceSched">Entrada - Saída</span>
              </div>
              <input type="time" class="form-control" v-model="schedule.start" v-bind:readonly="user.type == constants.ADVISOR_TYPE"/>
              <input type="time" class="form-control" v-model="schedule.end" v-bind:readonly="user.type == constants.ADVISOR_TYPE"/>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group row">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="weekDaySched">Dia</span>
              </div>
              <select class="custom-select" v-model="schedule.week_day" v-bind:disabled="user.type == constants.ADVISOR_TYPE">
                <option value="0">Domingo</option>
                <option value="1" selected>Segunda</option>
                <option value="2">Terça</option>
                <option value="3">Quarta</option>
                <option value="4">Quinta</option>
                <option value="5">Sexta</option>
                <option value="6">Sábado</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group row">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="activitySched">Atividade</span>
              </div>
              <select class="custom-select" v-model="schedule.activity" v-bind:disabled="user.type == constants.ADVISOR_TYPE">
                <option value="0" selected>Atendimento</option>
                <option value="1">Preparação</option>
                <option value="2">Elaboração</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group row">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="classroomIdSched">Sala</span>
              </div>
              <select class="custom-select" v-model="schedule.classroom_id" id="classroomIdSched" v-bind:disabled="user.type == constants.ADVISOR_TYPE">
              <option v-for="c in classrooms"
                v-bind:key="c.id" v-bind:value="c.id">{{c.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group row">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="obsrevationSched">Observação</span>
              </div>
              <textarea v-model="schedule.observation" class="form-control" v-bind:readonly="user.type == constants.ADVISOR_TYPE"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="user.type != constants.ADVISOR_TYPE">
        <div class="col-sm-6">
          <button class="btn btn-primary" @click="saveSchedule">{{saveButtonTitle}}</button>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-primary" @click="toggleEdition(false)">Cancelar</button>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-sm-4">
          <button class="btn btn-outline-primary" @click="aprroveRejectSchedule(true)">Aprovar</button>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-outline-secondary" @click="toggleEdition(false)">Cancelar</button>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-outline-danger" @click="aprroveRejectSchedule(false)">Recusar</button>
        </div>
    </div>
    </div>
    <br />
    <table v-if="ready" class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Dia</th>
          <th scope="col">Início</th>
          <th scope="col">Término</th>
          <th scope="col">Situação</th>
          <th scope="col">Atividade</th>
          <th scope="col">Observação</th>
          <th scope="col" v-if="!!user">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horario in horarios.status" :key="horario.id">
          <td>{{week_day(horario.week_day)}}</td>
          <td>{{horario.start}}</td>
          <td>{{horario.end}}</td>
          <td>{{schedules_situation(horario.situation)}}</td>
          <td>{{activity_type(horario.activity)}}</td>
          <td>{{horario.observation ? horario.observation : ""}}</td>
          <td v-if="!!user">
            <button v-if="horario.situation == 0 || (user.type == constants.MONITOR_TYPE && horario.situation != 2)" @click="editSchedule(horario)" class="btn btn-secondary">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Api from "../controllers/apiController";
import constants from '../utils/constants'

export default {
  props: {
    userData: Object,
    horarios: {},
    ready: false
  },
  data() {
    return {
      api: Api,
      constants: constants,
      showEdit: false,
      saveButtonTitle: "",
      schedule: {},
      classrooms: {},
      user: this.userData
    };
  },
  methods: {
    toast: function (type, body, title="") {
      this.$emit('toast', type, body, title);
    },
    load: function (value) {
      this.$emit('load', value);
    },
    aprroveRejectSchedule(approved) {
      this.schedule.situation = approved ? "1" : "2";
      this.schedule.activity += "";
      this.schedule.week_day += "";
      this.saveActualSchedule();
      this.toggleEdition(false);
    },
    saveSchedule() {
      if (this.isDataRight()) {
        if (!this.schedule.id) {
          this.schedule.person_id = this.user.id;
          this.schedule.situation = "0";
          let obs = this.schedule.observation;
          this.schedule.observation = obs === undefined ? "" : obs.toString();

          // Adcionar novo horário
          this.load(true);
          this.api.post("new/schedule", this.schedule)
              .then(res => {
                this.load(false);
                this.toast(1, "Salvo com sucesso");
              })
              .catch(res => {
                this.load(false);
                this.toast(2, "Erro ao salvar");
              });
        } else {
          // Atualizar horário existente
          this.schedule.situation = "0";
          this.saveActualSchedule();
        }
      } else {
        this.toast(2, "Insira os dados corretamente");
      }
    },
    saveActualSchedule() {
      this.load(true);
      // Salvar horário
      this.api.put("update/schedule", this.schedule)
        .then(res => {
          this.load(false);
          this.toast(1, "Salvo com sucesso");
        })
        .catch(res => {
          this.load(false);
          this.toast(2, "Erro ao salvar");
        });
    },
    isDataRight() {
      if (!this.schedule.start || !this.schedule.end) {
        return false;
      }

      let h = parseInt(this.schedule.start.substring(0, 2));
      let m = parseInt(this.schedule.start.substring(3, 5));
      let s = 0;
      let start = new Date();
      start.setHours(h, m, s);

      h = parseInt(this.schedule.end.substring(0, 2));
      m = parseInt(this.schedule.end.substring(3, 5));
      let end = new Date();
      end.setHours(h, m, s);

      if (start >= end) {
        return false;
      }

      if (this.schedule.week_day == undefined) {
        return false;
      }

      if (this.schedule.activity == undefined) {
        return false;
      }

      if (this.schedule.classroom_id == undefined) {
        return false;
      }

      return true;
    },
    toggleEdition(state) {
      if (state !== undefined) {
        this.showEdit = state;
        if (!state) {
          this.schedule = {};
        }
      } else {
        this.showEdit = !this.showEdit;
      }

      this.saveButtonTitle = !!this.schedule.id ? "Salvar" : "Adicionar";
    },
    editSchedule(schedule) {
      this.schedule = schedule;
      this.toggleEdition(true);
    },
    /// Filters
    schedules_situation: function(situation) {
      switch (situation) {
        case 0:
          return "Esperando aprovação";
        case 1:
          return "Ok";
        case 2:
          return "Indeferido";
        case 3:
          return "Encerrado";
        default:
          return "Outro";
      }
    },
    activity_type: function(type) {
      switch (type) {
        case 0:
          return "Atendimento";
        case 1:
          return "Preparação";
        case 2:
          return "Elaboração";
      }
    },
    week_day: function(day) {
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
  created() {
    this.load(true);
    this.api.get2('classrooms')
    .then((data) => this.classrooms = data.data.status)
    .catch((err) => this.toast(2, 'Erro ao carregar dados!'))
    .finally(() => this.load(false));
  }
};
</script>
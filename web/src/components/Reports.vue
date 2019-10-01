<template>
  <div class>
    <div class="col">
      <div class="card" v-for="report in reports.status" v-bind:key="report.id">
        <div v-if="!!report.id">
          <div class="card-header">
            Monitoria
            <span v-if="report.sent != null">- Enviado: {{formatDate(report.sent)}}</span>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <!-- Suggestions -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Sugestões</span>
                </div>
                <textarea v-model="report.suggestions" class="form-control" v-bind:readonly="report.sent != null"></textarea>
              </div>
              <!-- Activities -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Atividades</span>
                </div>
                <textarea v-model="report.activities" class="form-control" v-bind:readonly="report.sent != null"></textarea>
              </div>
              <!-- Observation -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Observações</span>
                </div>
                <textarea v-model="report.observation" class="form-control" v-bind:readonly="report.sent != null"></textarea>
              </div>
              <!-- Renovação -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Renovar?</span>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="renovationRadioGroup"
                    value="true"
                    v-model="report.renew"
                    v-bind:disabled="report.sent != null"
                  />
                  <label class="form-check-label" for="renovationRadioGroup">Sim</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="renovationRadioGroup"
                    value="false"
                    v-model="report.renew"
                    v-bind:disabled="report.sent != null"
                  />
                  <label class="form-check-label" for="renovationRadioGroup">Não</label>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <!-- Responsabilidade -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Responsabilidade</span>
                </div>
                <select class="custom-select" v-model="report.responsability" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
              <!-- Planejamento -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Planejamento</span>
                </div>
                <select class="custom-select" v-model="report.planning" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
              <!-- Critiavidade -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Critiavidade</span>
                </div>
                <select class="custom-select" v-model="report.criativity" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
              <!-- Relacionamento -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Relacionamento</span>
                </div>
                <select class="custom-select" v-model="report.relationship" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
              <!-- Autodesenvolvimento -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Autodesenvolvimento</span>
                </div>
                <select class="custom-select" v-model="report.autodevelopment" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
              <!-- Autocrítica -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Autocrítica</span>
                </div>
                <select class="custom-select" v-model="report.autocritics" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
              <!-- Avaliação geral -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Avaliação geral</span>
                </div>
                <select class="custom-select" v-model="report.evaluation" v-bind:disabled="report.sent != null">
                  <option value="0">Fraco / Não Houve</option>
                  <option value="1">Regular / Somente o necessário</option>
                  <option value="2">Bom / Suficiente</option>
                  <option value="3">Excelente</option>
                </select>
              </div>
            </div>
          </div>

          <div class="card-footer row">
            <div class="col-sm-6">
              <button
                class="btn btn-outline-primary btn-lg btn-block"
                @click="sendReport(report)"
                v-bind:disabled="report.sent != null"
              >Enviar</button>
            </div>
            <div class="col-sm-6">
              <button
                class="btn btn-outline-warning btn-lg btn-block"
                @click="cleanFields(report)"
                v-bind:disabled="report.sent != null"
              >Limpar</button>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-danger" role="alert">Nenhum lançamento para esse período</div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../controllers/apiController";
import DT from "../utils/dt";

export default {
  props: {
    reports: {}
  },
  data() {
    return {
      api: Api,
      dt: new DT()
    };
  },
  methods: {
    formatDate(value) {
      return this.dt.getFullDateLocal(this.dt.stringToLocal(value));
    },
    sendReport: function(report) {
      if (this.isDataRight(report)) {
        report.sent = this.dt.getFullDate(new Date().toString());
        this.load(true);
        this.api
          .put("update/report", report)
          .then(res => {
            this.toast(1, "Relatório salvo!");
          })
          .catch(err => {
            this.toast(2, "Erro ao tentar salvar relatório!");
          })
          .finally(() => {
            this.load(false);
          });
      } else {
        this.toast(3, "Preencha todos os campos!");
      }
    },
    isDataRight: function(ref) {
      if (
        ref.suggestions == null ||
        ref.suggestions == "" ||
        ref.activities == null ||
        ref.activities == "" ||
        ref.observation == null ||
        ref.observation == "" ||
        ref.evaluation == null ||
        ref.renew == null ||
        ref.responsability == null ||
        ref.planning == null ||
        ref.criativity == null ||
        ref.relationship == null ||
        ref.autodevelopment == null ||
        ref.autocritics == null
      ) {
        return false;
      }

      return true;
    },
    cleanFields: function(ref) {
      ref.suggestions = null;
      ref.activities = null;
      ref.observation = null;
      ref.evaluation = null;
      ref.renew = null;
      ref.responsability = null;
      ref.planning = null;
      ref.criativity = null;
      ref.relationship = null;
      ref.autodevelopment = null;
      ref.autocritics = null;
    },
    toast: function(type, body, title = "") {
      this.$emit("toast", type, body, title);
    },
    load: function(value) {
      this.$emit("load", value);
    }
  }
};
</script>

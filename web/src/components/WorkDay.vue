<template>
  <div>
    <div class="overlay" v-if="focused">
      <div class="col-6 mx-auto h-100">
        <div class="card justify-content-center">
          <h3 class="card-header">Dia {{dayTitle}}<i @click="expand" class="btn btn-secondary float-right">X</i></h3>
          <div class="card-body">
            <div class="col-sm-12">
              <div class="form-group row">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="entranceFreq">Entrada</span>
                    </div>
                    <input type="time" class="form-control">
                  </div>
              </div>

              <div class="form-group row">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="exitFreq">Saída</span>
                    </div>
                    <input type="time" class="form-control">
                  </div>
              </div>

              <div class="form-group row">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="classroomFreq">Sala</span>
                    </div>
                    <input type="number" class="form-control" placeholder="Número da sala">
                  </div>
              </div>

              <div class="form-group row">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="observationFreq">Observação</span>
                    </div>
                    <textarea class="form-control" placeholder="Ex.: Exercícios feitos"></textarea>
                  </div>
              </div>
              <button v-if="saveDay" class="btn btn-primary">Salvar horário</button>
              <button v-if="saveDay" class="btn btn-primary">Editar horário</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card " v-else @click="expand">
      <h5 class="card-header">{{day.getDate()}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: null
  },
  data() {
    return {
      dayTitle: this.day.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
      saveDay: true,
      focused: false
    };
  },
  methods: {
    expand() {
      this.focused = !this.focused;
    }
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
</style>

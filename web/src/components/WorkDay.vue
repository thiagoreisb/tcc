<template>
  <div>
    <div class="overlay" v-if="focused">
      <div class="col-6 mx-auto h-100">
        <div class="card h-100 justify-content-center">
          <h5 class="card-header" @click="expand">Dia {{dayTitle}}</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <button v-if="saveDay" class="btn btn-primary">Salvar horário</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card" v-else @click="expand">
      <h5 class="card-header">Dia {{dayTitle}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      dayTitle: '3 de Setembro de 2019',
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
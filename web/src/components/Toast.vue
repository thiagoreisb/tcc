<template>
  <div class="toast-position">
    <div class="toast" v-bind:class="getCSS" data-autohide="true" v-bind:data-delay="timeout">
      <div v-if="!!this.title" class="toast-header">
        <strong class="mr-auto text-primary">
          <i class="fas fa-info"></i>
          {{title}}
        </strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
      </div>
      <div v-else class="text-right">
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast">&times;</button>
      </div>
      <div class="toast-body">{{body}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: "",
    body: "",
    toastType: Number,
    time: Number
  },
  data() {
    return {
      timeout: !this.time ? 5000 : this.time
    };
  },
  computed: {
    getCSS() {
      if (this.toastType == 0) {
        return "warning-toast";
      } else if (this.toastType == 1) {
        return "success-toast";
      } else if (this.toastType == 2){
        return "error-toast";
      } else {
        return "info-toast";
      }
    }
  }
};
</script>

<style>
.toast-position {
  position: fixed;
  z-index: 3;
  width: 200px;
  top: 0;
  right: 0;
}

.warning-toast {
  background-color: #fcea47;
}

.success-toast {
  background-color: #4fff69;
}

.error-toast {
  background-color: #ff4040;
}

.info-toast {
  background-color: #2beaff;
}
</style>
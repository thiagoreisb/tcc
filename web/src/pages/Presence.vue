<template>
  <div>
    <h1>Controle de Presença</h1>
    {{frequencies}}
    <loading></loading>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Api from "../controllers/apiController";

export default {
  name: "presence",
  components: {
    Loading
  },
  data() {
    return {
      api: Api,
      frequencies: null,
      status_freq: false,
      loading: false
    };
  },
  created() {
    this.loading = true;
    this.api.get(
      "frequency/from/person/" + this.user.id,
      res => {
        this.frequencies = res;
        this.status_freq = true;
        this.loading = fasle;
      },
      res => {
        this.frequencies = res;
        this.loading = fasle;
      }
    );
  }
};
</script>

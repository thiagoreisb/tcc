<template>
     <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">Monitoria</div>
                <div class="row">
                    <div class="col-sm-6">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label" for="startdateMonitoringInput">Início</label>
                                    <input id="startdateMonitoringInput" type="date" class="col-7 col-form-label-plaintext" v-model="monitoring.start_date" >
                                </div>
                            </li>

                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label" for="finishMonitoringInput">Término</label>
                                    <input id="finishMonitoringInput" type="date" class="col-7 col-form-label-plaintext" v-model="monitoring.end_date" >
                                </div>
                            </li>

                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label">Bolsa</label>
                                    <div class="btn-group btn-group-toggle">
                                        <label class="btn btn-secondary" v-on:click="toggleButton(true)" id="assistanceMonitoringInput">
                                            <input type="radio" for="assistanceMonitoringInput" name="assistanceRadioGroup" autocomplete="off" value="true" v-model="monitoring.assistance"> Sim
                                        </label>
                                        <label class="btn btn-secondary" v-on:click="toggleButton(false)" id="volunteerMonitoringInput">
                                            <input type="radio" for="volunteerMonitoringInput" name="assistanceRadioGroup" autocomplete="off" value="false" v-model="monitoring.assistance"> Não
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="col-sm-6">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label" for="subjectMonitoringInput">Disciplina</label>
                                    <input id="subjectMonitoringInput" type="number" class="col-7 col-form-label-plaintext" v-model="monitoring.subject_id" >
                                </div>
                            </li>

                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label" for="studentMonitoringInput">Aluno</label>
                                    <input id="studentMonitoringInput" type="number" class="col-7 col-form-label-plaintext" v-model="monitoring.monitor_id" >
                                </div>
                            </li>

                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label" for="advisorMonitoringInput">Professor</label>
                                    <input id="advisorMonitoringInput" type="number" class="col-7 col-form-label-plaintext" v-model="monitoring.advisor_id" >
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="card-body">
                        <button id="addMonitoringButton" v-on:click="addMonitoring()" class="btn btn-primary col-sm-4">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        apiData: {}
    },
    data() {
        return {
            api: this.apiData,
            monitoring: {}
        }
    },
    methods: {
        addMonitoring() {
            if (this.monitoring.start_date === undefined || this.monitoring.end_date === undefined
                || this.monitoring.assistance === undefined || this.monitoring.subject_id === undefined
                || this.monitoring.monitor_id === undefined || this.monitoring.advisor_id === undefined) {
                alert("Preencha todos os campos!");
            } else if (this.monitoring.start_date === "" || this.monitoring.end_date === ""
                || (this.monitoring.assistance !== "true" && this.monitoring.assistance !== "false")
                || this.monitoring.subject_id === ""
                || this.monitoring.monitor_id === "" || this.monitoring.advisor_id === "") {
                    alert("Preencha todos os campos corretamente!");
            } else {
                let start = new Date(this.monitoring.start_date);
                let end = new Date(this.monitoring.end_date);

                if (start >= end) {
                    alert("Data de início deve ser menor que a de fim!");
                } else {
                    this.monitoring.subject_id = parseInt(this.monitoring.subject_id);
                    this.monitoring.monitor_id = parseInt(this.monitoring.monitor_id);
                    this.monitoring.advisor_id = parseInt(this.monitoring.advisor_id);

                    //send data to api
                    this.api.post('new/monitoring', this.monitoring)
                        .then((res) => {
                            if (res.data.err !== undefined) {
                                alert(err);
                            } else {
                                alert("Monitoria criada!");
                            }
                        })
                        .catch((err) => alert(err));
                }
            }
        },
        toggleButton(ref) {
            if (ref) {
                $('#volunteerMonitoringInput').removeClass('active');
                $('#assistanceMonitoringInput').addClass('active');
            } else {
                $('#assistanceMonitoringInput').removeClass('active');
                $('#volunteerMonitoringInput').addClass('active');
            }
        }
    }
}
</script>
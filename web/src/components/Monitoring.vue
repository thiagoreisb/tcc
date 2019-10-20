<template>
    <div class="container">
        <loading :loading="loading"></loading>
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
                                    <select class="col-7 custom-select" v-model="monitoring.monitor_id" id="studentMonitoringInput">
                                    <option v-for="s in getStudents"
                                        v-bind:key="s.id" v-bind:value="s.id">{{s.name}}</option>
                                    </select>
                                </div>
                            </li>

                            <li class="list-group-item">
                                <div class="form-group row">
                                    <label class="col-5 col-form-label" for="advisorMonitoringInput">Professor</label>
                                    <select class="col-7 custom-select" v-model="monitoring.advisor_id" id="advisorMonitoringInput">
                                    <option v-for="p in getProfessors"
                                        v-bind:key="p.id" v-bind:value="p.id">{{p.name}}</option>
                                    </select>
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
import Loading from "./Loading"
import FB from "../utils/fb"
import constants from '../utils/constants'

export default {
    components: {
        Loading
    },
    props: {
        apiData: {},
        parentData: {}
    },
    data() {
        return {
            api: this.apiData,
            monitoring: {},
            constants: constants,
            loading: false,
            students: {},
            professors: {},
            fb: this.parentData
        }
    },
    computed: {
        // Get only students that aren't monitors
        getStudents: function() {
            if (Array.isArray(this.students) && this.students.length) {
                return this.students.filter(x => !x.contract_id);
            }
            return [];
        },
        // Get only professors that aren't advisors
        getProfessors: function() {
            if (Array.isArray(this.professors) && this.professors.length) {
                return this.professors.filter(x => !x.contract_id);
            }
            return [];
        }
    },
    methods: {
        toast: function (type, body, title="") {
            this.$emit('toast', type, body, title);
        },
        load: function (value) {
            this.$emit('load', value);
        },
        addMonitoring() {
            if (this.monitoring.start_date === undefined || this.monitoring.end_date === undefined
                || this.monitoring.assistance === undefined || this.monitoring.subject_id === undefined
                || this.monitoring.monitor_id === undefined || this.monitoring.advisor_id === undefined) {
                this.toast(2, "Preencha todos os campos!");
            } else if (this.monitoring.start_date === "" || this.monitoring.end_date === ""
                || (this.monitoring.assistance !== "true" && this.monitoring.assistance !== "false")
                || this.monitoring.subject_id === ""
                || this.monitoring.monitor_id === "" || this.monitoring.advisor_id === "") {
                    this.toast(2, "Preencha todos os campos corretamente!");
            } else {
                let start = new Date(this.monitoring.start_date);
                let end = new Date(this.monitoring.end_date);

                if (start >= end) {
                    this.toast(2, "Data de início deve ser menor que a de fim!");
                } else {
                    this.monitoring.subject_id = parseInt(this.monitoring.subject_id);
                    this.monitoring.monitor_id = parseInt(this.monitoring.monitor_id);
                    this.monitoring.advisor_id = parseInt(this.monitoring.advisor_id);

                    /// Offset date values
                    start.setHours(start.getHours() + 4);
                    end.setHours(end.getHours() + 4);
                    
                    this.loading = true;
                    let _this = this;
                    
                    //send data to api
                    this.api.post('new/monitoring', this.monitoring)
                        .then((res) => {
                            this.loading = false;

                            if (res.data.err !== undefined) {
                                this.toast(2, "Erro ao tentar criar monitoria!");
                            } else {
                                var studentFound = false;
                                var professorFound = false;
                                /// Updates roles in firebase
                                _this.fb.database().ref('/roles/').once('value').then(function(snap) {
                                    snap.forEach(function(childSnap) {
                                        // Searches for student's ID
                                        if (childSnap.val().id == _this.monitoring.monitor_id) {
                                            _this.fb.database().ref('/roles/' + childSnap.key)
                                                .update({type: _this.constants.MONITOR_TYPE});
                                            studentFound = true;
                                        }
                                        // Searches for professor's ID
                                        if (childSnap.val().id == _this.monitoring.advisor_id) {
                                            _this.fb.database().ref('/roles/' + childSnap.key)
                                                .update({type: _this.constants.ADVISOR_TYPE});
                                            professorFound = true;
                                        }
                                        return studentFound && professorFound;
                                    });
                                });
                                this.toast(1, "Monitoria criada!");
                            }
                        })
                        .catch((err) => {
                            this.loading = false;
                            this.toast(2, "Monitoria não foi criada!");
                        });
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
        },
        searchStudent() {
            this.load(true);
            this.api.get2('student/')
                .then((r) => {
                    this.students = r.data.status;
                })
                .catch((err) => {
                    //
                })
                .finally(() => {
                    this.searchProfessor();
                    //this.load(false);
                });
        },
        searchProfessor() {
            // this.load(true);
            this.api.get2('professor/')
                .then((r) => {
                    this.professors = r.data.status;
                })
                .catch((err) => {
                    //
                })
                .finally(() => {
                    this.load(false);
                });
        }
    },
    created() {
        this.searchStudent();
    }
}
</script>

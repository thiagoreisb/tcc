<template>
    <div>
        <button v-if="editableAttend" class="btn btn-primary" @click="newAttend()">Novo</button>
        <div v-if="newAttendance" class="container">
            <div class="col-sm-12">
                <button class="btn btn-primary" @click="save()">Salvar</button>
                <button class="btn btn-secondary" @click="cancel()">Cancelar</button>
            </div>
            <br>
            <div class="col-sm-12">
                <!-- Aluno -->
                <div class="form-group row">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="studentAttend">Aluno</span>
                        </div>
                        <select class="custom-select" v-model="attend.person_id" id="studentAttendInput">
                        <option v-for="s in students"
                            v-bind:key="s.id" v-bind:value="s.id">{{s.name}}</option>
                        </select>
                    </div>
                </div>

                <!-- Horário início -->
                <div class="form-group row">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="entranceAttend">Entrada</span>
                        </div>
                        <input type="time" class="form-control" v-model="attend.start">
                    </div>
                </div>

                <!-- Horário fim -->
                <div class="form-group row">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="exitAttend">Término</span>
                        </div>
                        <input type="time" class="form-control" v-model="attend.end">
                    </div>
                </div>

                <!-- Observação -->
                <div class="form-group row">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="entranceAttend">Observações</span>
                        </div>
                        <textarea class="form-control" placeholder="Ex.: Conteúdo estudado" v-model="attend.observation"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <table v-if="ready" class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Dia</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Aluno</th>
                    <th scope="col">Observação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="atendimento in atendimentos.status" :key="atendimento.id">
                    <td>{{get_date(atendimento.actual_date)}}</td>
                    <td>{{atendimento.start}} - {{atendimento.end}}</td>
                    <td v-if="!!atendimento.person_name">{{atendimento.person_name}}</td>
                    <td v-else>{{atendimento.person_id}}</td>
                    <td>{{atendimento.observation}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Api from "../controllers/apiController";

export default {
    props: {
        atendimentos: {},
        ready: false,
        editable: false,
        freq_id: null
    },
    data() {
        return {
            api: Api,
            attend: {},
            editableAttend: this.editable,
            newAttendance: false,
            students: {}
        }
    },
    computed: {
        getStudents: function() {
            if (Array.isArray(this.students) && this.students.length) {
                return this.students.filter(x => !x.contract_id);
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
        newAttend() {
            this.newAttendance = true;
            this.editableAttend = false;
        },
        save() {
            this.attend.frequency_id = this.freq_id;
            if (this.isDataRight()) {
                this.load(true);
                this.api.post('new/attendance', this.attend)
                    .then((r) => {
                        this.toast(1, "Adicionado!");
                        this.$emit('reload-attendances', this.freq_id);
                    })
                    .catch((err) => {
                        this.toast(2, "Erro ao tentar adicionar!");
                    })
                    .finally(() => {
                        this.load(false);
                        this.newAttendance = false;
                        this.editableAttend = true;
                    });
            } else {
                this.toast(0, "Preencha os dados corretamente");
            }
        },
        isDataRight() {
            if (this.attend.frequency_id == undefined || this.attend.frequency_id == "") {
                return false;
            }

            if (this.attend.person_id == undefined || this.attend.person_id == "") {
                return false;
            }

            return true;
        },
        cancel() {
            this.newAttendance = false;
            this.editableAttend = true;
        },
        get_date: function (value) {
            if (!value) {
                return "";
            }

            let date = new Date(value);
            let days = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            return (days < 10 ? "0" : "") + days + "/" + (month < 10 ? "0" : "") + month + "/" + year;
        },
        searchStudents() {
            this.load(true);
            this.api.get2('student/')
                .then((r) => {
                    this.students = r.data.status;
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
        this.searchStudents();
    }
}
</script>
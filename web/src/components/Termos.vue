<template>
    <div>
        <table v-if="ready" class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Data Início</th>
                    <th scope="col">Data Término</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Bolsa</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="termo in orderedList" :key="termo.id">
                    <td>{{get_date(termo.start_date)}}</td>
                    <td>{{get_date(termo.end_date)}}</td>
                    <td>{{contract_situation(termo.situation)}}</td>
                    <td>{{termo.assistance ? "Sim" : "Não"}}</td>
                    <td class="btn btn-secondary" @click="openSchedule(termo.id)">Plano</td>
                </tr>
            </tbody>
        </table>
        <horarios></horarios>
    </div>
</template>

<script>
import Horarios from '../components/Horarios'
import Api from '../controllers/apiController'

export default {
    props: {
        termos: {},
        ready: false
    },
    components: {
        Horarios
    },
    data() {
        return {
            horarioShow: false,
            horarios: null,
            api: Api
        }
    },
    methods: {
        openSchedule: function (id) {
            // this.api.get('schedules/from/person/' + id,
            // (res) => {
            //     this.horarios = res;
            //     this.ready = false
            //     this.horarioShow = true;
            // }, (res) => this.horarios = res);
        },
        get_date: function (value) {
            let date = new Date(value);
            let days = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            return (days < 10 ? "0" : "") + days + "/" + (month < 10 ? "0" : "") + month + "/" + year;
        },
        contract_situation: function (situation) {
            switch (situation) {
                case 0:
                    return "Esperando aprovação";
                case 1:
                    return "Em andamento";
                case 2:
                    return "Indeferido";
                case 3:
                    return "Encerrado";
                default:
                    return "Outro";
            }
        }
    },
    computed: {
        orderedList: function() {
            let array = [...this.termos.status];

            for (let i = 0; i < array.length - 1; i++) {
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j].id > array[i].id) {
                        const temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }

            return array;
        }
    }
}
</script>
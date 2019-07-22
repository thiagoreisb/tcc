<template>
    <div>
        <table v-if="ready" class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Dia</th>
                    <th scope="col">Início</th>
                    <th scope="col">Término</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Atividade</th>
                    <th scope="col">Observação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="horario in horarios.status" :key="horario.id">
                    <td>{{week_day(horario.week_day)}}</td>
                    <td>{{horario.start}}</td>
                    <td>{{horario.end}}</td>
                    <td>{{schedules_situation(horario.situation)}}</td>
                    <td>{{activity(horario.activity)}}</td>
                    <td>{{horario.observation ? horario.observation : ""}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        horarios: {},
        ready: false
    },
    methods: {
        schedules_situation: function (situation) {
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
        activity: function (type) {
            switch (type) {
                case 0:
                    return "Atendimento";
                case 1:
                    return "Preparação";
                case 2:
                    return "Elaboração";
            }
        },
        week_day: function (day) {
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
    }
}
</script>
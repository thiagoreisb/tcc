<template>
    <div>
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
                    <td>{{atendimento.person_name}}</td>
                    <td>{{atendimento.observation}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        atendimentos: {},
        ready: false
    },
    methods: {
        get_date: function (value) {
            let date = new Date(value);
            let days = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            return (days < 10 ? "0" : "") + days + "/" + (month < 10 ? "0" : "") + month + "/" + year;
        }
    }
}
</script>
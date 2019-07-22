<template>
    <div>
        <table v-if="ready" class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Data Início</th>
                    <th scope="col">Data Término</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Bolsa</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="termo in termos.status" :key="termo.id">
                    <td>{{get_date(termo.start_date)}}</td>
                    <td>{{get_date(termo.end_date)}}</td>
                    <td>{{contract_situation(termo.situation)}}</td>
                    <td>{{termo.assistance ? "Sim" : "Não"}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        termos: {},
        ready: false
    },
    methods: {
        get_date: function (value) {
            let date = new Date(value);
            let days = date.getDate();
            let month = date.getMonth();
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
    }
}
</script>
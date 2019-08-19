<template>
    <div class="row">
        <div class="col-sm-6">
            <form class="card" v-for="report in reports.status" v-bind:key="report.id">
                <div class="card-header">Monitoria</div>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="sugestoesReportInput">Sugestões</label>
                            <input id="sugestoesReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.suggestions" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="atividadesReportInput">Atividades</label>
                            <input id="atividadesReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.activities" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="observacoesReportInput">Observações</label>
                            <input id="observacoesReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.observation" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="avaliacaoReportInput">Avaliação</label>
                            <input id="avaliacaoReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.evaluation" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="renovadoReportInput">Renovado</label>
                            <input id="renovadoReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.renew" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="responsabilidadeReportInput">Responsabilidade</label>
                            <input id="responsabilidadeReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.responsability" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="planejamentoReportInput">Planejamento</label>
                            <input id="planejamentoReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.planning" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="criatividadeReportInput">Criatividade</label>
                            <input id="criatividadeReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.criativity" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="relacionamentoReportInput">Relacionamento</label>
                            <input id="relacionamentoReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.relationship" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-5 col-form-label" for="autodesenvolvimentoReportInput">Autodesenvolvimento</label>
                            <input id="autodesenvolvimentoReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.autodevelopment" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-4 col-form-label" for="autocriticaReportInput">Autocrítica</label>
                            <input id="autocriticaReportInput" type="text" class="col-7 col-form-label-plaintext" v-model="report.autocritics" readonly>
                        </div>
                    </li>

                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-4 col-form-label" for="envioReportInput">Data de envio</label>
                            <input id="envioReportInput" type="text" class="col-7 col-form-label" v-model="report.sent" readonly>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reports: {}
    }
}
</script>

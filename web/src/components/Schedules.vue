<template>
    <div>
        <table v-if="ready" class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Monitoria</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="schedule in subjects" :key="schedule.subject_id">
                    <td>{{schedule.subject_name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        schedules: Array,
        ready: false
    },
    computed: {
        subjects: function () {
            return Array.from(new Set(this.schedules.map(x => x.subject_id)))
                .map(id => {
                    return {
                        subject_id: id,
                        subject_name: this.schedules.find(x => x.subject_id === id).subject_name
                    };
                });
        }
    }
}
</script>
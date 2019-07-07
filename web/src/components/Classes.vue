<template>
    <table class="table table-hover">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Sala</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="classroom in classrooms.status" v-bind:key="classroom.id">
                <th scope="row">{{classroom.id}}</th>
                <td>{{classroom.name}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        classrooms: Object
    }
}
</script>

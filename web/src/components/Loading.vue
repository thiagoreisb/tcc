<template>
    <div v-if="loading" class="overlay">
        <div class="overlay-content text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Carregando...</span>
            </div>
            <h2>Carregando...</h2>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loading: false
    },
    data() {
        return {
            load: this.loading
        }
    }
}
</script>

<style scoped>
    .overlay {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 5;
        left: 0;
        top: 0;
        background-color: rgb(199, 209, 203);
        background-color: rgb(199, 209, 203, 0.9);
        overflow-x: hidden;
        transition: 0.5s;
    }

    .overlay-content {
        position: relative;
        top: 25%;
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>
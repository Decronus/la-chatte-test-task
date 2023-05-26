<template>
    <table-comp />
</template>

<script>
import TableComp from "./components/TableComp.vue";

export default {
    name: "App",
    components: { TableComp },
};
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px 20px;
}
</style>

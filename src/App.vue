<template>
    <table-comp />
    <add-contact />
</template>

<script>
import AddContact from "./components/modals/AddContact.vue";
import TableComp from "./components/TableComp.vue";

export default {
    name: "App",
    components: { TableComp, AddContact },
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

<template>
    <table-comp />
    <add-contact />
    <edit-contact />
</template>

<script>
import AddContact from "./components/modals/AddContact.vue";
import EditContact from "./components/modals/EditContact.vue";
import TableComp from "./components/TableComp.vue";

export default {
    name: "App",
    components: { TableComp, AddContact, EditContact },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px 20px;
}
</style>

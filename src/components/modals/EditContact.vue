<template>
    <a-modal
        v-model:visible="$store.state.modals.editContact.visible"
        style="width: 355px"
        title="Редактировать контакт"
        @cancel="$store.commit('closeEditContact')"
        @ok="editContact"
    >
        <div class="add-contact-inputs-wrap">
            <a-input type="text" placeholder="Имя" v-model:value="$store.state.modals.editContact.data.name" />
            <a-input type="text" placeholder="Фамилия" v-model:value="$store.state.modals.editContact.data.surname" />
            <a-input type="text" placeholder="Телефон" v-model:value="$store.state.modals.editContact.data.phone" />
            <a-input type="text" placeholder="Email" v-model:value="$store.state.modals.editContact.data.email" />
        </div>
    </a-modal>
</template>

<script>
export default {
    name: "edit-contact",
    data() {
        return {
            contact: {
                name: "",
                surname: "",
                phone: "",
                email: "",
            },
        };
    },

    methods: {
        editContact() {
            console.log(this.contact);
            this.$store.commit("editContact", this.contact);
        },
    },
};
</script>

<style>
.add-contact-inputs-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>

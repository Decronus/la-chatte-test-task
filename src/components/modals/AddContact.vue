<template>
    <a-modal
        v-model:visible="$store.state.modals.addContact.visible"
        style="width: 355px"
        title="Добавить контакт"
        @cancel="$store.commit('closeAddContact')"
        @ok="addContact"
    >
        <div class="add-contact-inputs-wrap">
            <a-input type="text" placeholder="Имя" v-model:value="contact.name" />
            <a-input type="text" placeholder="Фамилия" v-model:value="contact.surname" />
            <a-input type="text" placeholder="Телефон" v-model:value="contact.phone" />
            <a-input type="text" placeholder="Email" v-model:value="contact.email" />
        </div>
    </a-modal>
</template>

<script>
export default {
    name: "add-contact",
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
        addContact() {
            this.$store.commit("addContact", this.contact);
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

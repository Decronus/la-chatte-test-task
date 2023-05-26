<template>
    <a-modal
        v-model:visible="$store.state.modals.editContact.visible"
        style="width: 355px"
        title="Редактировать контакт"
        @cancel="$store.commit('closeEditContact')"
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
import { v4 as uuidv4 } from "uuid";

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
        addContact() {
            const contact = this.contact;
            contact.key = uuidv4();
            console.log(uuidv4());
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

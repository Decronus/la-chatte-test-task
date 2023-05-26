<template>
    <a-modal
        v-model:visible="$store.state.modals.addContact.visible"
        style="width: 355px"
        title="Добавить контакт"
        @cancel="closeForm"
        @ok="addContact"
    >
        <div class="add-contact-inputs-wrap">
            <a-input type="text" placeholder="Имя" v-model:value="contact.name" />
            <a-input type="text" placeholder="Фамилия" v-model:value="contact.surname" />
            <a-input type="text" placeholder="Телефон" v-model:value="contact.phone" />
            <a-input type="text" placeholder="Email" v-model:value="contact.email" />
            <span v-if="error" class="add-contact-error">Заполните все поля</span>
        </div>
    </a-modal>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

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
            error: false,
        };
    },

    methods: {
        addContact() {
            if (Object.values(this.contact).includes("")) {
                this.error = true;
                return;
            }
            const contact = this.contact;
            contact.key = uuidv4();
            this.$store.commit("addContact", contact);
            this.$store.commit("closeAddContact");
            this.clearForm();
        },

        closeForm() {
            this.clearForm();
            this.$store.commit("closeAddContact");
        },

        clearForm() {
            this.contact = {
                name: "",
                surname: "",
                phone: "",
                email: "",
            };
            this.error = false;
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

.add-contact-error {
    color: #d15151;
}
</style>

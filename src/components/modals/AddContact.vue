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
            <a-input
                type="text"
                placeholder="Телефон"
                :value="contact.phone"
                @change="(event) => (contact.phone = event.target.value.replace(/\D/g, ''))"
            />
            <a-input type="text" placeholder="Email" v-model:value="contact.email" />
            <span v-if="fillInputsError" class="add-contact-error">Заполните все поля</span>
            <span v-if="emailError" class="add-contact-error">Введите правильный email</span>
        </div>
    </a-modal>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
    name: "add-contact",
    data() {
        return {
            isInit: true,
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
            this.isInit = false;
            if (this.fillInputsError) return;
            if (this.emailError) return;

            const contact = this.contact;
            contact.key = uuidv4();
            this.$store.commit("addContact", contact);

            this.$store.commit("closeAddContact");
            this.isInit = true;
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
        },
    },

    computed: {
        fillInputsError() {
            if (!this.isInit) {
                return Object.values(this.contact).includes("");
            }
        },

        emailError() {
            if (!this.isInit) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(this.contact.email);
            }
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

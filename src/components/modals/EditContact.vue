<template>
    <a-modal
        v-model:visible="$store.state.modals.editContact.visible"
        style="width: 355px"
        title="Редактировать контакт"
        @cancel="$store.commit('closeEditContact')"
        @ok="editContact"
    >
        <div class="edit-contact-inputs-wrap">
            <a-input type="text" placeholder="Имя" v-model:value="name" />
            <a-input type="text" placeholder="Фамилия" v-model:value="surname" />
            <a-input type="text" placeholder="Телефон" v-model:value="phone" />
            <a-input type="text" placeholder="Email" v-model:value="email" />
            <span v-if="error" class="edit-contact-error">Заполните все поля</span>
        </div>
    </a-modal>
</template>

<script>
export default {
    name: "edit-contact",
    data() {
        return {
            name: "",
            surname: "",
            phone: "",
            email: "",
            error: false,
        };
    },

    methods: {
        editContact() {
            if (Object.values(this.contact).includes("")) {
                this.error = true;
                return;
            }
            this.$store.commit("editContact", this.contact);
        },

        initInputs() {
            this.name = this.$store.state.modals.editContact.data.name;
            this.surname = this.$store.state.modals.editContact.data.surname;
            this.phone = this.$store.state.modals.editContact.data.phone;
            this.email = this.$store.state.modals.editContact.data.email;
        },

        clearInputs() {
            this.name = "";
            this.surname = "";
            this.phone = "";
            this.email = "";
            this.error = false;
        },
    },

    computed: {
        contact() {
            return {
                key: this.$store.state.modals.editContact.data.key,
                name: this.name,
                surname: this.surname,
                phone: this.phone,
                email: this.email,
            };
        },
    },

    watch: {
        "$store.state.modals.editContact.visible"(newVisible) {
            if (newVisible) {
                this.initInputs();
            } else {
                this.clearInputs();
            }
        },
    },
};
</script>

<style>
.edit-contact-inputs-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.edit-contact-error {
    color: #d15151;
}
</style>

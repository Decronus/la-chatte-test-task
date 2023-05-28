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
            <a-input
                type="text"
                placeholder="Телефон"
                :value="phone"
                @change="(event) => (phone = event.target.value.replace(/\D/g, ''))"
            />
            <a-input type="text" placeholder="Email" v-model:value="email" />
            <span v-if="fillInputsError" class="add-contact-error">Заполните все поля</span>
            <span v-if="emailError" class="add-contact-error">Введите правильный email</span>
        </div>
    </a-modal>
</template>

<script>
export default {
    name: "edit-contact",
    data() {
        return {
            isInit: false,
            name: "",
            surname: "",
            phone: "",
            email: "",
        };
    },

    methods: {
        editContact() {
            this.isInit = false;
            if (this.fillInputsError) return;
            if (this.emailError) return;
            this.isInit = true;
            this.$store.commit("editContact", this.contact);
            this.$store.commit("saveContactsToStorage");
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

        fillInputsError() {
            if (!this.isInit) {
                return Object.values(this.contact).includes("");
            }
        },

        emailError() {
            if (!this.isInit) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(this.email);
            }
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

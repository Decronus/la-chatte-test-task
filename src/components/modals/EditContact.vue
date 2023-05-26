<template>
    <a-modal
        v-model:visible="$store.state.modals.editContact.visible"
        style="width: 355px"
        title="Редактировать контакт"
        :destroyOnClose="true"
        @cancel="$store.commit('closeEditContact')"
        @ok="$store.commit('editContact')"
    >
        <div class="edit-contact-inputs-wrap">
            <a-input type="text" placeholder="Имя" v-model:value="name" />
            <a-input type="text" placeholder="Фамилия" v-model:value="surname" />
            <a-input type="text" placeholder="Телефон" v-model:value="phone" />
            <a-input type="text" placeholder="Email" v-model:value="email" />
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
        };
    },

    methods: {
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
</style>

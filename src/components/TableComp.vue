<template>
    <div class="table-wrap">
        <div class="table-search-row">
            <a-input-search placeholder="Поиск контакта" @search="setSearchQuery" />
            <a-button type="primary" @click="$store.commit('openAddContact')">Добавить контакт</a-button>
        </div>

        <a-table :columns="columns" :data-source="filteredContacts" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a>Редактировать {{ record.name }}</a>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
export default {
    name: "table-comp",
    data() {
        return {
            columns: [
                {
                    title: "Имя",
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: "Фамилия",
                    dataIndex: "surname",
                    key: "surname",
                },
                {
                    title: "Телефон",
                    dataIndex: "phone",
                    key: "phone",
                },
                {
                    title: "Email",
                    key: "email",
                    dataIndex: "email",
                },
                {
                    title: "Действия",
                    key: "action",
                },
            ],
            searchQuery: "",
        };
    },

    methods: {
        setSearchQuery(value) {
            this.searchQuery = value;
        },
    },

    computed: {
        filteredContacts() {
            const contacts = this.$store.state.contacts;
            const query = this.searchQuery ? this.searchQuery.toLowerCase() : this.searchQuery;
            if (!query) {
                return contacts;
            } else {
                return contacts.filter((contact) => {
                    const joinedName = `${contact.name} ${contact.surname}`.toLowerCase();
                    return joinedName.includes(query);
                });
            }
        },
    },
};
</script>

<style>
.table-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.table-search-row {
    display: flex;
    gap: 10px;
}
</style>

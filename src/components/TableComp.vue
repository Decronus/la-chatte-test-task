<template>
    <div class="table-wrap">
        <div class="table-search-row">
            <a-input-search placeholder="Поиск контакта" @search="setSearchQuery" />
            <a-button type="primary" @click="$store.commit('openAddContact')">Добавить контакт</a-button>
        </div>

        <a-table :columns="columns" :data-source="filteredContacts" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <span class="table-icons-wrap">
                        <a-button @click="$store.commit('openEditContact')">
                            <template #icon>
                                <edit-outlined />
                            </template>
                        </a-button>

                        <a-button danger @click="$store.commit('deleteContact', record.key)">
                            <template #icon>
                                <delete-outlined />
                            </template>
                        </a-button>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

export default {
    name: "table-comp",
    components: { EditOutlined, DeleteOutlined },
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

.table-icons-wrap {
    display: flex;
    gap: 5px;
}
</style>

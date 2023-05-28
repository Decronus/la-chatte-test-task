<template>
    <div class="table-wrap">
        <div class="table-search-row">
            <a-input-search placeholder="Поиск контакта" @search="setSearchQuery" />
            <a-button @click="$store.commit('openAddContact')">Добавить контакт</a-button>
        </div>

        <a-table :columns="columns" :data-source="filteredContacts" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <span class="table-icons-wrap">
                        <a-button @click="$store.commit('openEditContact', record)">
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

        <div>
            <div class="table-buttons-row">
                <input type="file" accept=".csv" ref="fileInputRef" style="display: none" @change="importCSV" />
                <a-button @click="$refs.fileInputRef.click()">Импорт в CSV</a-button>
                <a-button type="primary" @click="exportToCsv">Экспорт в CSV</a-button>
            </div>
        </div>
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
                    title: "",
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

        exportToCsv() {
            const contacts = this.$store.state.contacts;
            let csvContent = "data:text/csv;charset=utf-8,";

            const headers = ["key", "name", "surname", "phone", "email"];
            csvContent += headers.join(",") + "\n";

            contacts.forEach((contact) => {
                const values = headers.map((header) => contact[header]);
                csvContent += values.join(",") + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "contacts.csv");

            document.body.appendChild(link);
            link.click();
            link.remove();
        },

        importCSV(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const content = event.target.result;
                const lines = content.split("\n");
                lines.splice(lines.length - 1);
                const headers = lines[0].split(",");
                const contacts = [];
                for (let i = 1; i < lines.length; i++) {
                    const obj = {};
                    const currentLine = lines[i].split(",");

                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentLine[j];
                    }

                    contacts.push(obj);
                }
                this.$store.commit("loadCSV", contacts);
            };

            reader.readAsText(file);
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

.table-buttons-row {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>

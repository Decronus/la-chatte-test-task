<template>
    <div class="table-wrap">
        <a-input-search placeholder="input search text" @search="setSearchQuery" />
        <a-table :columns="columns" :data-source="filteredUsers" :pagination="false">
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
            usersData: [
                {
                    key: "1",
                    name: "John",
                    surname: "Brown",
                    phone: "+7 999 100 00 41",
                    email: "johnbrown@mail.ru",
                },
                {
                    key: "2",
                    name: "Jim",
                    surname: "Green",
                    phone: "+7 912 121 55 06",
                    email: "jimgreen@mail.ru",
                },
                {
                    key: "3",
                    name: "Joe",
                    surname: "Black",
                    phone: "+7 982 473 15 47",
                    email: "joeblack@mail.ru",
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
        filteredUsers() {
            const query = this.searchQuery ? this.searchQuery.toLowerCase() : this.searchQuery;
            if (!query) {
                return this.usersData;
            } else {
                return this.usersData.filter((user) => {
                    const joinedName = `${user.name} ${user.surname}`.toLowerCase();
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
</style>

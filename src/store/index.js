import { createStore } from "vuex";

export default createStore({
    state: {
        contacts: [
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
        modals: {
            addContact: { visible: false },
            editContact: {
                visible: false,
                data: { key: "", name: "", surname: "", phone: "", email: "" },
            },
        },
    },
    getters: {},
    mutations: {
        openAddContact(state) {
            state.modals.addContact.visible = true;
        },
        closeAddContact(state) {
            state.modals.addContact.visible = false;
        },
        addContact(state, contact) {
            state.contacts.push(contact);
        },
        deleteContact(state, key) {
            state.contacts = state.contacts.filter((el) => el.key !== key);
        },

        openEditContact(state, contact) {
            state.modals.editContact.data = contact;
            state.modals.editContact.visible = true;
        },
        closeEditContact(state) {
            state.modals.editContact.visible = false;
        },
        editContact(state, contact) {
            const contactEl = state.contacts.find((el) => el.key === contact.key);
            const index = state.contacts.indexOf(contactEl);
            for (let key in contact) {
                state.contacts[index][key] = contact[key];
            }
            state.modals.editContact.visible = false;
            state.modals.editContact.data = {};
        },
    },
    actions: {},
    modules: {},
});

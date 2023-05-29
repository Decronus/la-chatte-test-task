import { createStore } from "vuex";

export default createStore({
    state: {
        contacts: [
            {
                key: "1",
                name: "John",
                surname: "Brown",
                phone: "79991000041",
                email: "johnbrown@mail.ru",
            },
            {
                key: "2",
                name: "Jim",
                surname: "Green",
                phone: "79121215506",
                email: "jimgreen@mail.ru",
            },
            {
                key: "3",
                name: "Joe",
                surname: "Black",
                phone: "79824731547",
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
        saveContactsToStorage(state) {
            localStorage.setItem("contacts", JSON.stringify(state.contacts));
        },
        setContacts(state, contacts) {
            state.contacts = contacts;
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
    actions: {
        updateContacts({ commit }, payload) {
            switch (payload.type) {
                case "add":
                    commit("addContact", payload.contact);
                    break;
                case "edit":
                    commit("editContact", payload.contact);
                    break;
                case "delete":
                    commit("deleteContact", payload.key);
                    break;
            }
            commit("saveContactsToStorage");
        },
    },
    modules: {},
});

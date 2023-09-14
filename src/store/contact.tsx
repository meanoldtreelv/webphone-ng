import { createSlice } from "@reduxjs/toolkit";

const initialContactState = {
	addContactPopUpOpen: false,
	deleteContactPopUpOpen: false,
	selectedContactOpen: false,
	contactList: [],
	selectedContact: [],
};

const contactSlice = createSlice({
	name: "contact",
	initialState: initialContactState,
	reducers: {
		closeAddContact(state) {
			state.addContactPopUpOpen = false;
		},
		openAddContact(state) {
			state.addContactPopUpOpen = true;
		},
		closeDeleteContact(state) {
			state.deleteContactPopUpOpen = false;
		},
		openDeleteContact(state) {
			state.deleteContactPopUpOpen = true;
		},
		openSelectedContact(state) {
			state.selectedContactOpen = true;
		},
		closeSelectedContact(state) {
			state.selectedContactOpen = false;
		},
		setContactList(state, action) {
			console.log("setContactList action dispatched with payload:", action.payload);
			state.contactList = action.payload;
		},
		setSelectedContact(state, action) {
			console.log("setSellected contact action dispatched with payload:", action.payload);
			state.selectedContact = action.payload;
		},
	},
});

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;

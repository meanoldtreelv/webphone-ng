import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContactList, IContactState } from "./contactTypes";
import { useLazyUpdateContactQuery } from "services/contact";

const initialContactState: IContactState = {
	addContactPopUpOpen: false,
	deleteContactPopUpOpen: false,
	selectedContactOpen: false,
	contactList: [],
	selectedContact: null as IContactList,
	deleteContactId: "",
	editContactNumber: "",
};

const contactSlice = createSlice({
	name: "contact",
	initialState: initialContactState,
	// this reducer needs refactoring
	reducers: {
		closeAddEditContact(state) {
			state.addContactPopUpOpen = false;
		},
		openAddEditContact(state) {
			state.addContactPopUpOpen = true;
		},
		closeDeleteContact(state) {
			state.deleteContactPopUpOpen = false;
			state.selectedContactOpen = false;
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
			state.contactList = action.payload;
		},
		setSelectedContact(state, action) {
			state.selectedContact = action.payload;
		},
		setDeleteContactId(state, action) {
			state.deleteContactId = action.payload;
		},
		setEditContactNumber(state, action) {
			state.editContactNumber = action.payload;
		},
		setEditContactFalse(state) {
			state.editContactNumber = null;
			state.addContactPopUpOpen = false;
		},
	},
});

export const {
	closeAddEditContact,
	openAddEditContact,
	closeDeleteContact,
	openDeleteContact,
	openSelectedContact,
	closeSelectedContact,
	setContactList,
	setSelectedContact,
	setDeleteContactId,
	setEditContactNumber,
	setEditContactFalse,
} = contactSlice.actions;

export default contactSlice.reducer;

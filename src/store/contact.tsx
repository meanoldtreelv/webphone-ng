import { createSlice } from "@reduxjs/toolkit";

const initialContactState = { addContactPopUpOpen: false, deleteContactPopUpOpen: false };

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
	},
});

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;

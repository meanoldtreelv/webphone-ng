import { createSlice } from "@reduxjs/toolkit";
import { IClioState } from "./clioTypes";

const initialClioState: IClioState = {
	isClioLoggedIn: false,
	isClioActivated: true,
	contactDetails: false,
	isAddNoteOpen: false,
	isAddTaskOpen: false,
	isNewExpenseOpen: false,
	isNewTimeEntryOpen: false,
	contact: {},
	matter: {},
};

const clioSlice = createSlice({
	name: "clio",
	initialState: initialClioState,

	reducers: {
		setIsClioLoggedIn(state, action) {
			state.isClioLoggedIn = action.payload;
		},
		setIsClioActivated(state, action) {
			state.isClioActivated = action.payload;
		},
		setContactDetails(state, action) {
			state.contactDetails = action.payload;
		},
		setIsAddNoteOpen(state, action) {
			state.isAddNoteOpen = action.payload;
		},
		setIsAddTaskOpen(state, action) {
			state.isAddTaskOpen = action.payload;
		},
		setIsNewExpenseOpen(state, action) {
			state.isNewExpenseOpen = action.payload;
		},
		setIsNewTimeEntryOpen(state, action) {
			state.isNewTimeEntryOpen = action.payload;
		},
		setContact(state, action) {
			state.contact = action.payload;
		},
		setMatter(state, action) {
			state.matter = action.payload;
		},

		// setDateRange(state, action) {
		// 	const { start, end } = action.payload;

		// 	state.dateRange = { start: start, end: end };
		// },
	},
});

export const {
	setIsClioLoggedIn,
	setIsClioActivated,
	setContactDetails,
	setIsAddNoteOpen,
	setIsAddTaskOpen,
	setIsNewExpenseOpen,
	setIsNewTimeEntryOpen,
	setContact,
	setMatter,

	// setDateRange,
} = clioSlice.actions;

export default clioSlice.reducer;

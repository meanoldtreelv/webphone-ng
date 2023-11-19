import { createSlice } from "@reduxjs/toolkit";
import { IClioState } from "./clioTypes";

const initialClioState: IClioState = {
	isClioActivated: true,
	contactDetails: false,
	isAddNoteOpen: false,
	isAddTaskOpen: false,
	isNewExpenseOpen: false,
};

const clioSlice = createSlice({
	name: "clio",
	initialState: initialClioState,

	reducers: {
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

		// setDateRange(state, action) {
		// 	const { start, end } = action.payload;

		// 	state.dateRange = { start: start, end: end };
		// },
	},
});

export const {
	setIsClioActivated,
	setContactDetails,
	setIsAddNoteOpen,
	setIsAddTaskOpen,
	setIsNewExpenseOpen,

	// setDateRange,
} = clioSlice.actions;

export default clioSlice.reducer;

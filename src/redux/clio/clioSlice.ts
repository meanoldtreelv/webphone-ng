import { createSlice } from "@reduxjs/toolkit";
import { IClioState } from "./clioTypes";

const initialClioState: IClioState = {
	isClioActivated: true,
	contactDetails: false,
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

		// setDateRange(state, action) {
		// 	const { start, end } = action.payload;

		// 	state.dateRange = { start: start, end: end };
		// },
	},
});

export const {
	setIsClioActivated,
	setContactDetails,

	// setDateRange,
} = clioSlice.actions;

export default clioSlice.reducer;

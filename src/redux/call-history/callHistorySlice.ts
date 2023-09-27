import { createSlice } from "@reduxjs/toolkit";
import { ICallHistoryState } from "./callHistoryTypes";

const initialCallHistoryState: ICallHistoryState = {
	callHistory: [],
};

const callHistorySlice = createSlice({
	name: "callHistory",
	initialState: initialCallHistoryState,

	reducers: {
		setCallHistory(state, action) {
			state.callHistory = action.payload;
		},
	},
});

export const { setCallHistory } = callHistorySlice.actions;

export default callHistorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { ICallHistoryState } from "./callHistoryTypes";

const initialCallHistoryState: ICallHistoryState = {
	callHistory: [],
	selectedCallHistory: {}
};

const callHistorySlice = createSlice({
	name: "callHistory",
	initialState: initialCallHistoryState,

	reducers: {
		setCallHistory(state, action) {
			state.callHistory = action.payload;
		},
		setSelectedCallHistory(state, action) {
			state.selectedCallHistory= action.payload;
		}
	},
});

export const { setCallHistory, setSelectedCallHistory } = callHistorySlice.actions;

export default callHistorySlice.reducer;

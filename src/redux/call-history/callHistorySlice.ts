import { createSlice } from "@reduxjs/toolkit";
import { ICallHistoryState } from "./callHistoryTypes";

const initialCallHistoryState: ICallHistoryState = {
	callHistory: [],
	selectedCallHistory: {},
	queries: {
		page: 1,
		page_size: 20,
	},
	strQueries: "",
};

const callHistorySlice = createSlice({
	name: "callHistory",
	initialState: initialCallHistoryState,

	reducers: {
		setCallHistory(state, action) {
			state.callHistory = action.payload;
		},
		setSelectedCallHistory(state, action) {
			state.selectedCallHistory = action.payload;
		},
		setQueries(state, action) {
			state.queries = action.payload;
			state.strQueries = new URLSearchParams(state.queries).toString();
		},
	},
});

export const { setCallHistory, setSelectedCallHistory, setQueries } = callHistorySlice.actions;

export default callHistorySlice.reducer;

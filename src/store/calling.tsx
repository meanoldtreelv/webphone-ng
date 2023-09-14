import { createSlice } from "@reduxjs/toolkit";

const initialCallingState = {
	dialer: true,
	callInProgress: false,
	addCalling: false,
	transferCalling: false,
	callEnding: false,
};

const callingSlice = createSlice({
	name: "calling",
	initialState: initialCallingState,
	reducers: {
		dialPad(state) {
			state.dialer = true;
			state.callInProgress = false;
			state.callEnding = false;
		},
		progressCall(state) {
			state.callInProgress = true;
			state.dialer = false;
		},
		endCall(state) {
			state.callEnding = true;
			state.callInProgress = false;
		},
		addCall(state) {
			state.addCalling = true;
			state.callInProgress = false;
			state.dialer = false;
		},
		transferCall(state) {
			state.transferCalling = true;
		},
	},
});

export const callingActions = callingSlice.actions;

export default callingSlice.reducer;

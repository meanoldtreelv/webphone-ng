import { createSlice } from "@reduxjs/toolkit";
import { ICallState } from "./callTypes";

const initialCallState: ICallState = {
	dialer: true,
	callInProgress: false,
	addCall: false,
	transferCall: false,
	callEnding: false,
	callNumber: "",
};

const callSlice = createSlice({
	name: "call",
	initialState: initialCallState,
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
			state.addCall = true;
			state.callInProgress = false;
			state.dialer = false;
		},
		transferCall(state) {
			state.transferCall = true;
		},
		setCallNumber(state, action) {
			state.callNumber = action.payload;
		},
	},
});

export const { dialPad, progressCall, endCall, addCall, transferCall, setCallNumber } = callSlice.actions;

export default callSlice.reducer;

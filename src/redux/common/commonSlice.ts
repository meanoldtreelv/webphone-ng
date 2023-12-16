import { createSlice } from "@reduxjs/toolkit";

const initialCommonState = {
	modal: false,
	playPause: false,
	notification: {
		type: "",
		msg: "",
	},
	simpleNotification: "",
	loader: false,
	extChange: false,
	sessionOut: false,
};

const commonSlice = createSlice({
	name: "common",
	initialState: initialCommonState,
	reducers: {
		toggleModal(state) {
			state.modal = !state.modal;
		},
		togglePlayPause(state, action) {
			state.playPause = action.payload;
		},
		setNotification(state, action) {
			state.notification = action.payload;
		},
		setSimpleNotification(state, action) {
			state.simpleNotification = action.payload;
		},
		setLoader(state, action) {
			state.loader = action.payload;
		},
		setExtChange(state) {
			state.extChange = !state.extChange;
		},
		setSessionOut(state, action) {
			state.sessionOut = action.payload;
		},
	},
});

export const {
	toggleModal,
	togglePlayPause,
	setNotification,
	setSimpleNotification,
	setLoader,
	setExtChange,
	setSessionOut,
} = commonSlice.actions;

export default commonSlice.reducer;

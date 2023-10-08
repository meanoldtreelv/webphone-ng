import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCommonState = {
	modal: false,
	playPause: false,
	notification: {
		type: "",
		msg: "",
	},
	simpleNotification: ""
};

const commonSlice = createSlice({
	name: "common",
	initialState: initialCommonState,
	reducers: {
		toggleModal(state) {
			state.modal = !state.modal;
		},
		togglePlayPause(state) {
			state.playPause = !state.playPause;
		},
		setNotification(state, action) {
			state.notification = action.payload;
		},
		setSimpleNotification(state, action) {
			state.simpleNotification = action.payload;
		}
	},
});

export const { toggleModal, togglePlayPause, setNotification, setSimpleNotification } = commonSlice.actions;

export default commonSlice.reducer;

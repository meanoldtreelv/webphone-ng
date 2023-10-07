import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCommonState = {
	modal: false,
	playPause: false,
	notification: {
		type: "",
		msg: "",
	},
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
	},
});

export const { toggleModal, togglePlayPause, setNotification } = commonSlice.actions;

export default commonSlice.reducer;

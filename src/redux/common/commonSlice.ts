import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCommonState = {
	modal: false,
	playPause: false,
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
	},
});

export const { toggleModal, togglePlayPause } = commonSlice.actions;

export default commonSlice.reducer;

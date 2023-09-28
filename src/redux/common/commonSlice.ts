import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCommonState = {
	modal: false
};

const commonSlice = createSlice({
	name: "common",
	initialState: initialCommonState,
	reducers: {
		toggleModal(state) {
            state.modal = !state.modal;
        }
	},
});

export const {
	toggleModal
} = commonSlice.actions;

export default commonSlice.reducer;

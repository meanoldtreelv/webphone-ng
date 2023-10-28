import { createSlice } from "@reduxjs/toolkit";
import { ISidecarState } from "./sidecarTypes";

const initialSidecarState: ISidecarState = {
	sidecarSidebar: true,
	tabSelected: "general",
};

const sidecarSlice = createSlice({
	name: "sidecar",
	initialState: initialSidecarState,

	reducers: {
		setTabSelected(state, action) {
			state.tabSelected = action.payload;
		},
	},
});

export const { setTabSelected } = sidecarSlice.actions;

export default sidecarSlice.reducer;

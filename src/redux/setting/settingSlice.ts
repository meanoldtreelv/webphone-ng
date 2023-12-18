import { createSlice } from "@reduxjs/toolkit";
import { ISettingState } from "./settingTypes";

const initialSettingState: ISettingState = {
	settingTabSelected: "sip_account",
};

const settingSlice = createSlice({
	name: "setting",
	initialState: initialSettingState,
	// this reducer needs refactoring
	reducers: {
		setSettingTab(state, action) {
			state.settingTabSelected = action.payload;
		},
	},
});

export const { setSettingTab } = settingSlice.actions;

export default settingSlice.reducer;

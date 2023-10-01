import { createSlice } from "@reduxjs/toolkit";
import { IVoicemailState } from "./voicemailTypes";

const initialVoicemailState: IVoicemailState = {
	selectedVoicemail: {},
};

const voicemailSlice = createSlice({
	name: "voicemail",
	initialState: initialVoicemailState,

	reducers: {
		setSelectedVoicemail(state, action) {
			state.selectedVoicemail = action.payload;
		},
	},
});

export const { setSelectedVoicemail } = voicemailSlice.actions;

export default voicemailSlice.reducer;

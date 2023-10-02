import { createSlice } from "@reduxjs/toolkit";
import { IVoicemailState } from "./voicemailTypes";

const initialVoicemailState: IVoicemailState = {
	selectedVoicemail: {},
	moreOptVoicemailId: "",
	selectVoicemails: false,
	selectedVoicemailList: [],
};

const voicemailSlice = createSlice({
	name: "voicemail",
	initialState: initialVoicemailState,

	reducers: {
		setSelectedVoicemail(state, action) {
			state.selectedVoicemail = action.payload;
		},
		setMoreOptVoicemailId(state, action) {
			state.moreOptVoicemailId = action.payload;
		},
		setSelectVoicemails(state) {
			state.selectVoicemails = !state.selectVoicemails;
		},
		setSelectedVoicemailList(state, action) {
			state.selectedVoicemailList = [...state.selectedVoicemailList, action.payload];
		},
	},
});

export const { setSelectedVoicemail, setMoreOptVoicemailId, setSelectVoicemails, setSelectedVoicemailList } =
	voicemailSlice.actions;

export default voicemailSlice.reducer;

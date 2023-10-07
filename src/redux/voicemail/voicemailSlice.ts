import { createSlice } from "@reduxjs/toolkit";
import { IVoicemailState } from "./voicemailTypes";

const initialVoicemailState: IVoicemailState = {
	selectedVoicemail: {},
	moreOptVoicemailId: "",
	selectVoicemails: false,
	selectedVoicemailList: [],
	page: 1,
	voicemailResults: [],
	queries: {},
	strQueries: "",
	newFilter: false,
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
			state.selectedVoicemailList =
				action.payload.type === "ADD"
					? [...state.selectedVoicemailList, action.payload.id]
					: action.payload.type === "RESET"
					? []
					: state.selectedVoicemailList.filter((id) => id != action.payload.id);
		},
		setPage(state, action) {
			state.page = action.payload;
		},
		setVoicemailResults(state, action) {
			state.voicemailResults = action.payload;
		},
		setVoicemailQueries(state, action) {
			state.queries = action.payload;
			state.strQueries = new URLSearchParams(state.queries).toString();
		},
		setNewFilter(state, action) {
			state.newFilter = action.payload;
		}
	},
});

export const {
	setSelectedVoicemail,
	setMoreOptVoicemailId,
	setSelectVoicemails,
	setSelectedVoicemailList,
	setPage,
	setVoicemailResults,
	setVoicemailQueries,
	setNewFilter
} = voicemailSlice.actions;

export default voicemailSlice.reducer;

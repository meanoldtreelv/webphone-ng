import { createSlice } from "@reduxjs/toolkit";
import { IMeetState } from "./meetTypes";

const initialMeetState: IMeetState = {
	scheduleDialogue: false,
	settingsDialogue: false,
	joinDialogue: false,
	editDialogue: false,
	deleteDialogue: false,
	descriptionDialogue: false,
};

const meetSlice = createSlice({
	name: "meet",
	initialState: initialMeetState,

	reducers: {
		setScheduleDialogue(state, action) {
			state.scheduleDialogue = action.payload;
		},
		setSettingsDialogue(state, action) {
			state.settingsDialogue = action.payload;
		},
		setJoinDialogue(state, action) {
			state.joinDialogue = action.payload;
		},
		setEditDialogue(state, action) {
			state.editDialogue = action.payload;
		},
		setDeleteDialogue(state, action) {
			state.deleteDialogue = action.payload;
		},
		setDescriptionDialogue(state, action) {
			state.descriptionDialogue = action.payload;
		},
	},
});

export const {
	setScheduleDialogue,
	setSettingsDialogue,
	setJoinDialogue,
	setEditDialogue,
	setDeleteDialogue,
	setDescriptionDialogue,
} = meetSlice.actions;

export default meetSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { IMeetState } from "./meetTypes";

const initialMeetState: IMeetState = {
	scheduleDialogue: false,
	settingsDialogue: false,
	joinDialogue: false,
	editDialogue: false,
	deleteDialogue: false,
	descriptionDialogue: false,
	recordDialogue: false,
	dateRange: { start: "", end: "" },
	calendarView: "day",
	meetingDetails: {},
	eventId: "",
	videoRecordingData: [],
	calendarType: "",
	meetingId: "",
	meetList: [],
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
		setDateRange(state, action) {
			const { start, end } = action.payload;

			state.dateRange = { start: start, end: end };
		},
		setCalendarView(state, action) {
			state.calendarView = action.payload;
		},
		setMeetingDetails(state, action) {
			state.meetingDetails = action.payload;
		},
		seteventId(state, action) {
			state.eventId = action.payload;
		},
		setRecordDialogue(state, action) {
			state.recordDialogue = action.payload;
		},
		setVideoRecordingData(state, action) {
			state.videoRecordingData = action.payload;
		},
		setCalendarType(state, action) {
			state.calendarType = action.payload;
		},
		setMeetingId(state, action) {
			state.meetingId = action.payload;
		},
		setMeetList(state, action) {
			state.meetList = action.payload;
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
	setDateRange,
	setCalendarView,
	setMeetingDetails,
	seteventId,
	setRecordDialogue,
	setVideoRecordingData,
	setCalendarType,
	setMeetingId,
	setMeetList,
} = meetSlice.actions;

export default meetSlice.reducer;

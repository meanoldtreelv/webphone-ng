import { createSlice } from "@reduxjs/toolkit";
import { IMeetState } from "./meetTypes";

let currentDate = new Date();

// Set time to 00:00:00
// currentDate.setHours(23, 0, 0, 0);

// Format the date to a string with the desired format
let formattedStartDate = currentDate.toISOString().split("T")[0] + " 00:00:00";

// console.log(formattedStartDate);

// Create a new date 7 days from the current date
const newDate = new Date(currentDate);
newDate.setDate(currentDate.getDate() + 7);
let formattedEndDate = newDate.toISOString().split("T")[0] + " 23:59:59";
// console.log(formattedEndDate, "formattedEndDate");

const initialMeetState: IMeetState = {
	scheduleDialogue: false,
	settingsDialogue: false,
	joinDialogue: false,
	editDialogue: false,
	deleteDialogue: false,
	descriptionDialogue: false,
	recordDialogue: false,
	dateRange: { start: null, end: null },
	meetDateRange: { meetStart: null, meetEnd: null },
	loading: false,
	calendarView: "week",
	meetingDetails: {},
	eventId: "",
	videoRecordingData: [],
	calendarType: "",
	meetingId: "",
	meetList: [],
	view: null,
	date: null,
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
		setMeetDateRange(state, action) {
			const { meetStart, meetEnd } = action.payload;

			state.meetDateRange = { meetStart: meetStart, meetEnd: meetEnd };
		},
		setLoading(state, action) {
			state.loading = action.payload;
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
		setView(state, action) {
			state.view = action.payload;
		},
		setDate(state, action) {
			state.date = action.payload;
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
	setMeetDateRange,
	setLoading,
	setCalendarView,
	setMeetingDetails,
	seteventId,
	setRecordDialogue,
	setVideoRecordingData,
	setCalendarType,
	setMeetingId,
	setMeetList,
	setView,
	setDate,
} = meetSlice.actions;

export default meetSlice.reducer;

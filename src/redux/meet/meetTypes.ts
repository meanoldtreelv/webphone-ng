export interface IMeetState {
	scheduleDialogue: boolean;
	joinDialogue: boolean;
	settingsDialogue: boolean;
	editDialogue: boolean;
	deleteDialogue: boolean;
	descriptionDialogue: boolean;
	dateRange: { start: string; end: string };
	calendarView: string;
	meetingDetails: Object;
	eventId: string;
	recordDialogue: boolean;
	videoRecordingData: [];
	calendarType: string;
	meetingId: string;
}

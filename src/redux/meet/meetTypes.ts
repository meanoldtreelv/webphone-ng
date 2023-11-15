export interface IMeetState {
	scheduleDialogue: boolean;
	joinDialogue: boolean;
	settingsDialogue: boolean;
	editDialogue: boolean;
	deleteDialogue: boolean;
	descriptionDialogue: boolean;
	dateRange: { start: any; end: any };
	meetDateRange: { meetStart: any; meetEnd: any };
	loading: boolean;
	calendarView: string;
	meetingDetails: Object;
	eventId: string;
	recordDialogue: boolean;
	videoRecordingData: [];
	calendarType: string;
	meetingId: string;
	meetList: {}[];
	view: any;
	date: any;
}

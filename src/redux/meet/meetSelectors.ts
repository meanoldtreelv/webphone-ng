import { RootState } from "./../../redux/store";

export const scheduleDialogue = (state: RootState) => state.meet.scheduleDialogue;
export const settingsDialogue = (state: RootState) => state.meet.settingsDialogue;
export const joinDialogue = (state: RootState) => state.meet.joinDialogue;
export const editDialogue = (state: RootState) => state.meet.editDialogue;
export const deleteDialogue = (state: RootState) => state.meet.deleteDialogue;
export const descriptionDialogue = (state: RootState) => state.meet.descriptionDialogue;
export const dateRange = (state: RootState) => state.meet.dateRange;
export const calendarView = (state: RootState) => state.meet.calendarView;
export const meetingDetails = (state: RootState) => state.meet.meetingDetails;
export const eventId = (state: RootState) => state.meet.eventId;
export const recordDialogue = (state: RootState) => state.meet.recordDialogue;
export const videoRecordingData = (state: RootState) => state.meet.videoRecordingData;
export const calendarType = (state: RootState) => state.meet.calendarType;
export const meetingId = (state: RootState) => state.meet.meetingId;
export const meetList = (state: RootState) => state.meet.meetList;
export const view = (state: RootState) => state.meet.view;
export const date = (state: RootState) => state.meet.date;

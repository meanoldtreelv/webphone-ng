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

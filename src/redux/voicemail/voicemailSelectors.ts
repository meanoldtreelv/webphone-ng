import { RootState } from "./../../redux/store";

export const selectedVoicemail = (state: RootState) => state.voicemail.selectedVoicemail;
export const moreOptVoicemail = (state: RootState) => state.voicemail.moreOptVoicemailId;
export const selectVoicemails = (state: RootState) => state.voicemail.selectVoicemails;
export const selectedVoicemails = (state: RootState) => state.voicemail.selectedVoicemailList;
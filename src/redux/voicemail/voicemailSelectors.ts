import { RootState } from "./../../redux/store";

export const selectedVoicemail = (state: RootState) => state.voicemail.selectedVoicemail;
export const voicemailLists = (state: RootState) => state.voicemail.voicemailLists;

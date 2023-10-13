import { RootState } from "./../../redux/store";

export const selectedVoicemail = (state: RootState) => state.voicemail.selectedVoicemail;
export const moreOptVoicemail = (state: RootState) => state.voicemail.moreOptVoicemailId;
export const selectVoicemails = (state: RootState) => state.voicemail.selectVoicemails;
export const selectedVoicemails = (state: RootState) => state.voicemail.selectedVoicemailList;
export const voicemailPage = (state: RootState) => state.voicemail.page;
export const voicemailResults = (state: RootState) => state.voicemail.voicemailResults;
export const voicemailQueries = (state: RootState) => state.voicemail.queries;
export const voicemailStrQueries = (state: RootState) => state.voicemail.strQueries;
export const voicemailNewFilter = (state: RootState) => state.voicemail.newFilter;
export const voicemailFilterExt = (state: RootState) => state.voicemail.filterExt;

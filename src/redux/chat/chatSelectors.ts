import { RootState } from "./../../redux/store";

export const conversationLists = (state: RootState) => state.chat.conversationLists;
export const sortConversationType = (state: RootState) => state.chat.sortConversationType;
export const isConversationSelected = (state: RootState) => state.chat.isConversationSelected;
export const isStartNewConversationDialogueOpen = (state: RootState) => state.chat.isStartNewConversationDialogueOpen;
export const isAddMemberDialogueOpen = (state: RootState) => state.chat.isAddMemberDialogueOpen;
export const isImgViewerDialogueOpen = (state: RootState) => state.chat.isImgViewerDialogueOpen;
export const isVideoViewerDialogueOpen = (state: RootState) => state.chat.isVideoViewerDialogueOpen;
export const isAudioViewerDialogueOpen = (state: RootState) => state.chat.isAudioViewerDialogueOpen;
export const isDocumentViewerDialogueOpen = (state: RootState) => state.chat.isDocumentViewerDialogueOpen;
export const isShareContactDialogueOpen = (state: RootState) => state.chat.isShareContactDialogueOpen;
export const isDeleteConversationDialogueOpen = (state: RootState) => state.chat.isDeleteConversationDialogueOpen;
export const isAddContactDialogueOpen = (state: RootState) => state.chat.isAddContactDialogueOpen;
export const isEditContactDialogueOpen = (state: RootState) => state.chat.isEditContactDialogueOpen;
export const isSettingDialogueOpen = (state: RootState) => state.chat.isSettingDialogueOpen;
export const isContactDetailsDialogueOpen = (state: RootState) => state.chat.isContactDetailsDialogueOpen;
export const queries = (state: RootState) => state.chat.queries;
export const strQueries = (state: RootState) => state.chat.strQueries;
export const conversationData = (state: RootState) => state.chat.conversationData;
export const isSortingMessagePopUpOpen = (state: RootState) => state.chat.isSortingMessagePopUpOpen;
export const fromContactLists = (state: RootState) => state.chat.fromContactLists;
export const textingContactLists = (state: RootState) => state.chat.textingContactLists;
export const fromNumberSelected = (state: RootState) => state.chat.fromNumberSelected;
export const socket = (state: RootState) => state.chat.socket;
export const startConversationType = (state: RootState) => state.chat.startConversationType;
export const addedMemberLists = (state: RootState) => state.chat.addedMemberLists;
export const campaignMemberLists = (state: RootState) => state.chat.campaignMemberLists;
export const msgLists = (state: RootState) => state.chat.msgLists;
export const editContact = (state: RootState) => state.chat.editContact;

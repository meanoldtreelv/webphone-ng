import { RootState } from "./../../redux/store";

export const conversationLists = (state: RootState) => state.chat.conversationLists;
export const isConversationSelected = (state: RootState) => state.chat.isConversationSelected;
export const isStartNewConversationDialogueOpen = (state: RootState) => state.chat.isStartNewConversationDialogueOpen;
export const isAddMemberDialogueOpen = (state: RootState) => state.chat.isAddMemberDialogueOpen;
export const isImgViewerDialogueOpen = (state: RootState) => state.chat.isImgViewerDialogueOpen;
export const isVideoViewerDialogueOpen = (state: RootState) => state.chat.isVideoViewerDialogueOpen;
export const isAudioViewerDialogueOpen = (state: RootState) => state.chat.isAudioViewerDialogueOpen;
export const isDocumentViewerDialogueOpen = (state: RootState) => state.chat.isDocumentViewerDialogueOpen;
export const isShareContactDialogueOpen = (state: RootState) => state.chat.isShareContactDialogueOpen;
export const isDeleteConversationDialogueOpen = (state: RootState) => state.chat.isDeleteConversationDialogueOpen;

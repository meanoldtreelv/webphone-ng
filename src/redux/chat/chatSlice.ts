import { createSlice } from "@reduxjs/toolkit";
import { IChatState } from "./chatTypes";

const initialChatState: IChatState = {
	conversationLists: [],
	isConversationSelected: false,
	isStartNewConversationDialogueOpen: false,
	isAddMemberDialogueOpen: false,
	isImgViewerDialogueOpen: false,
	isVideoViewerDialogueOpen: false,
	isAudioViewerDialogueOpen: false,
	isDocumentViewerDialogueOpen: false,
	isShareContactDialogueOpen: false,
	isDeleteConversationDialogueOpen: false,
};

const chatSlice = createSlice({
	name: "chat",
	initialState: initialChatState,

	reducers: {
		setConversationLists(state, action) {
			state.conversationLists = action.payload;
		},
		setIsConversationSelected(state, action) {
			state.isConversationSelected = action.payload;
		},
		setIsStartNewConversationDialogueOpen(state, action) {
			state.isStartNewConversationDialogueOpen = action.payload;
		},
		setIsAddMemberDialogueOpen(state, action) {
			state.isAddMemberDialogueOpen = action.payload;
		},
		setIsImgViewerDialogueOpen(state, action) {
			state.isImgViewerDialogueOpen = action.payload;
		},
		setIsVideoViewerDialogueOpen(state, action) {
			state.isVideoViewerDialogueOpen = action.payload;
		},
		setIsAudioViewerDialogueOpen(state, action) {
			state.isAudioViewerDialogueOpen = action.payload;
		},
		setIsDocumentViewerDialogueOpen(state, action) {
			state.isDocumentViewerDialogueOpen = action.payload;
		},
		setIsShareContactDialogueOpen(state, action) {
			state.isShareContactDialogueOpen = action.payload;
		},
		setIsDeleteConversationDialogueOpen(state, action) {
			state.isDeleteConversationDialogueOpen = action.payload;
		},
	},
});

export const {
	setConversationLists,
	setIsConversationSelected,
	setIsStartNewConversationDialogueOpen,
	setIsAddMemberDialogueOpen,
	setIsImgViewerDialogueOpen,
	setIsVideoViewerDialogueOpen,
	setIsAudioViewerDialogueOpen,
	setIsDocumentViewerDialogueOpen,
	setIsShareContactDialogueOpen,
	setIsDeleteConversationDialogueOpen,
} = chatSlice.actions;

export default chatSlice.reducer;

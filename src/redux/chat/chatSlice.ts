import { createSlice } from "@reduxjs/toolkit";
import { IChatState } from "./chatTypes";

const initialChatState: IChatState = {
	conversationLists: [],
	sortConversationType: "lastActivity",
	isConversationSelected: false,
	isStartNewConversationDialogueOpen: false,
	isAddMemberDialogueOpen: false,
	isImgViewerDialogueOpen: false,
	isVideoViewerDialogueOpen: false,
	isAudioViewerDialogueOpen: false,
	isDocumentViewerDialogueOpen: false,
	isShareContactDialogueOpen: false,
	isDeleteConversationDialogueOpen: false,
	isSortingMessagePopUpOpen: false,
	queries: {
		page: 1,
		per_page: 20,
		sort: "last_activity",
		// contact_id: "",
		// search: "",
		// from_numbers: ["8123772212", "8123772212"],
	},
	strQueries: new URLSearchParams({
		page: 1,
		per_page: 20,
		sort: "last_activity",
	}).toString(),
	conversationData: {},
	fromContactLists: [],
	textingContactLists: [],
	fromNumberSelected: "",
	socket: null,
	startConversationType: "conversations",
	addedMemberLists: [],
	campaignMemberLists: [],
	msgLists: [],
};

const chatSlice = createSlice({
	name: "chat",
	initialState: initialChatState,

	reducers: {
		setConversationLists(state, action) {
			state.conversationLists = action.payload;
		},
		setSortConversationType(state, action) {
			state.sortConversationType = action.payload;
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
		setIsSortingMessagePopUpOpen(state, action) {
			state.isSortingMessagePopUpOpen = action.payload;
		},
		setQueries(state, action) {
			state.queries = action.payload;
			state.strQueries = new URLSearchParams(state.queries).toString();
		},
		setConversationData(state, action) {
			state.conversationData = action.payload;
		},
		setFromContactLists(state, action) {
			state.fromContactLists = action.payload;
		},
		setTextingContactLists(state, action) {
			state.textingContactLists = action.payload;
		},
		setFromNumberSelected(state, action) {
			state.fromNumberSelected = action.payload;
		},
		setSocket(state, action) {
			state.socket = action.payload;
		},
		setStartConversationType(state, action) {
			state.startConversationType = action.payload;
		},
		setAddedMemberLists(state, action) {
			state.addedMemberLists = action.payload;
		},
		setCampaignMemberLists(state, action) {
			state.campaignMemberLists = action.payload;
		},
		setMsgLists(state, action) {
			state.msgLists = action.payload;
		},
	},
});

export const {
	setConversationLists,
	setSortConversationType,
	setIsConversationSelected,
	setIsStartNewConversationDialogueOpen,
	setIsAddMemberDialogueOpen,
	setIsImgViewerDialogueOpen,
	setIsVideoViewerDialogueOpen,
	setIsAudioViewerDialogueOpen,
	setIsDocumentViewerDialogueOpen,
	setIsShareContactDialogueOpen,
	setIsDeleteConversationDialogueOpen,
	setIsSortingMessagePopUpOpen,
	setQueries,
	setConversationData,
	setFromContactLists,
	setTextingContactLists,
	setFromNumberSelected,
	setSocket,
	setStartConversationType,
	setAddedMemberLists,
	setCampaignMemberLists,
	setMsgLists,
} = chatSlice.actions;

export default chatSlice.reducer;

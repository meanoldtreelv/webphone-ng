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
	isAddContactDialogueOpen: false,
	isEditContactDialogueOpen: false,
	isSettingDialogueOpen: false,
	isContactDetailsDialogueOpen: false,
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
	editContact: {},
	selectAllMsg: false,
	selectedMsgLists: [],
	isDeleteCheck: false,
	emoji: null,
	imageFiles: [],
	selectedFiles: null,
	selectedAudioFiles: {},
	selectedVideoFiles: {},
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
		setIsAddContactDialogueOpen(state, action) {
			state.isAddContactDialogueOpen = action.payload;
		},
		setIsEditContactDialogueOpen(state, action) {
			state.isEditContactDialogueOpen = action.payload;
		},
		setIsSettingDialogueOpen(state, action) {
			state.isSettingDialogueOpen = action.payload;
		},
		setIsContactDetailsDialogueOpen(state, action) {
			state.isContactDetailsDialogueOpen = action.payload;
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
		setEditContact(state, action) {
			state.editContact = action.payload;
		},
		setSelectAllMsg(state, action) {
			state.selectAllMsg = action.payload;
		},
		setSelectedMsgLists(state, action) {
			state.selectedMsgLists =
				action.payload.type === "ADD"
					? [...state.selectedMsgLists, action.payload.id]
					: action.payload.type === "RESET"
					? []
					: action.payload.type === "SELECT_ALL"
					? action.payload.idLists
					: state.selectedMsgLists.filter((id) => id !== action.payload.id);
		},
		setIsDeleteCheck(state, action) {
			state.isDeleteCheck = action.payload;
		},
		setEmoji(state, action) {
			state.emoji = action.payload;
		},
		setImageFiles(state, action) {
			state.imageFiles = action.payload;
		},
		setSelectedFiles(state, action) {
			state.selectedFiles = action.payload;
		},
		setSelectedAudioFiles(state, action) {
			state.selectedAudioFiles = action.payload;
		},
		setSelectedVideoFiles(state, action) {
			state.selectedVideoFiles = action.payload;
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
	setIsAddContactDialogueOpen,
	setIsEditContactDialogueOpen,
	setIsSettingDialogueOpen,
	setIsContactDetailsDialogueOpen,
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
	setEditContact,
	setSelectAllMsg,
	setSelectedMsgLists,
	setIsDeleteCheck,
	setEmoji,
	setImageFiles,
	setSelectedFiles,
	setSelectedAudioFiles,
	setSelectedVideoFiles,
} = chatSlice.actions;

export default chatSlice.reducer;

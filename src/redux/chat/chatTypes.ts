export interface IChatState {
	conversationLists: {}[];
	sortConversationType: "lastActivity" | "unreadTop";
	isConversationSelected: boolean;
	isStartNewConversationDialogueOpen: boolean;
	isAddMemberDialogueOpen: boolean;
	isImgViewerDialogueOpen: boolean;
	isVideoViewerDialogueOpen: boolean;
	isAudioViewerDialogueOpen: boolean;
	isDocumentViewerDialogueOpen: boolean;
	isShareContactDialogueOpen: boolean;
	isDeleteConversationDialogueOpen: boolean;
	isSortingMessagePopUpOpen: boolean;
	queries: {
		contact_id?: string;
		page?: number;
		per_page?: number;
		search?: string;
		sort?: "last_activity" | "unread";
		from_numbers?: string[];
	};
	strQueries: string;
	conversationData: {};
	fromContactLists: [];
	textingContactLists: [];
	fromNumberSelected: string;
	socket: any;
}

import BaseLayout from "layouts/BaseLayout";
import { useEffect } from "react";
import styles from "./Chat.module.scss";
import NoMessages from "components/Chat/NoMessages";
import ConversationsList from "components/Chat/ConversationsList";
import NoConversationsSelected from "components/Chat/NoConversationsSelected";
import ConversationsBox from "components/Chat/ConversationsBox";
import PromptDialog from "components/Modal/PromptDialog";
import StartNewConversations from "components/Chat/StartNewConversations";
import AddMember from "components/Chat/AddMember";
import ImgViewer from "components/Chat/Viewer/ImgViewer";
import VideoViewer from "components/Chat/Viewer/VideoViewer";
import AudioViewer from "components/Chat/Viewer/AudioViewer";
import DocumentViewer from "components/Chat/Viewer/DocumentViewer";
import ShareContactDialogue from "components/Chat/ShareContactDialogue";
import { useDispatch, useSelector } from "react-redux";
import {
	conversationLists,
	isAddMemberDialogueOpen,
	isAudioViewerDialogueOpen,
	isConversationSelected,
	isDeleteConversationDialogueOpen,
	isDocumentViewerDialogueOpen,
	isImgViewerDialogueOpen,
	isShareContactDialogueOpen,
	isStartNewConversationDialogueOpen,
	isVideoViewerDialogueOpen,
} from "redux/chat/chatSelectors";
import { setIsDeleteConversationDialogueOpen } from "redux/chat/chatSlice";

const Chat = () => {
	const dispatch = useDispatch();
	const conversationsLists = useSelector(conversationLists);
	const conversationSelected = useSelector(isConversationSelected);
	const startNewConversationDialogueOpen = useSelector(isStartNewConversationDialogueOpen);
	const addMemberDialogueOpen = useSelector(isAddMemberDialogueOpen);
	const imgViewerDialogueOpen = useSelector(isImgViewerDialogueOpen);
	const videoViewerDialogueOpen = useSelector(isVideoViewerDialogueOpen);
	const audioViewerDialogueOpen = useSelector(isAudioViewerDialogueOpen);
	const documentViewerDialogueOpen = useSelector(isDocumentViewerDialogueOpen);
	const shareContactDialogueOpen = useSelector(isShareContactDialogueOpen);
	const deleteConversationDialogueOpen = useSelector(isDeleteConversationDialogueOpen);

	useEffect(() => {
		const fetchData = async () => {};

		fetchData();
	}, []);

	const deleteConversationsHandler = () => {
		dispatch(setIsDeleteConversationDialogueOpen(false));
	};

	return (
		<div className={styles.chat}>
			<BaseLayout>
				<div className={styles.noMessageBox}>
					{conversationsLists.length === 0 ? (
						<section className={styles.contact_container}>
							<ConversationsList />
							{conversationSelected ? <ConversationsBox /> : <NoConversationsSelected />}
						</section>
					) : (
						<NoMessages />
					)}
				</div>
			</BaseLayout>
			{deleteConversationDialogueOpen && (
				<PromptDialog
					type="warning"
					title="Delete Conversations"
					actionBtnTxt="Delete"
					onClick={deleteConversationsHandler}
					// loading={isLoading}
				>
					Are you sure that you want to delete conversation ?
				</PromptDialog>
			)}
			{startNewConversationDialogueOpen && <StartNewConversations />}
			{addMemberDialogueOpen && <AddMember />}
			{imgViewerDialogueOpen && <ImgViewer />}
			{videoViewerDialogueOpen && <VideoViewer />}
			{audioViewerDialogueOpen && <AudioViewer />}
			{documentViewerDialogueOpen && <DocumentViewer />}
			{shareContactDialogueOpen && <ShareContactDialogue />}
		</div>
	);
};

export default Chat;

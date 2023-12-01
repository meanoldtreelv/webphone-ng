import BaseLayout from "layouts/BaseLayout";
import { useEffect, useState } from "react";
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
	strQueries,
} from "redux/chat/chatSelectors";
import { setConversationData, setConversationLists, setIsDeleteConversationDialogueOpen } from "redux/chat/chatSlice";
import { useLazyGetConversationListsQuery } from "services/chat";
import Loader from "components/UI/Loader";
import { showToast } from "utils";
// import { useLazyGetConversationListsQuery } from "services/meet";
// import { useGetConversationListsQuery } from "services/chat";
// import { useGetConversationListsQuery } from "services/texting";

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
	const strQuery = useSelector(strQueries);

	const [getConversationLists, { data: conversationListsData, isLoading: isLoading1, isFetching: isFetching1 }] =
		useLazyGetConversationListsQuery();
	// const [getCallHistories, { data: historyData, isLoading, isFetching }] = useLazyGetCallHistoriesQuery();

	const [isDeleteChatLoading, setIsDeleteChatLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const { error, data } = await getConversationLists(strQuery);

			if (data) {
				// console.log(data, "data");

				dispatch(setConversationLists(data));
			}

			if (error) {
				// console.log("getting error in fetching conversations list API");
				showToast("There is error in fetching Conversation Lists, please try again later  ", "error");
			} else {
				// console.log("====================================");
				// console.log("succes in fetching conversation api");
				// console.log("====================================");
				// dispatch(setConversationData(conversationListsData));
			}
		};
		fetchData();
	}, []);

	// useEffect(() => {
	// 	dispatch(setConversationData(conversationListsData));
	// }, [conversationListsData !== undefined]);

	// if (conversationListsData !== undefined) {
	// 	dispatch(setConversationData(conversationListsData));
	// }

	const deleteConversationsHandler = () => {
		setIsDeleteChatLoading(true);
		dispatch(setIsDeleteConversationDialogueOpen(false));
	};

	// console.log(strQuery, "strQuery");
	// console.log(conversationListsData);

	// console.log("====================================");
	// console.log(conversationListsData);
	// console.log(conversationsLists, "from redux");

	// console.log("====================================");
	return (
		<div className={`pagePopUp`}>
			<BaseLayout>
				<div className={styles.noMessageBox}>
					{conversationsLists?.length > 0 ? (
						<section className={styles.contact_container}>
							<ConversationsList />
							{conversationSelected ? <ConversationsBox /> : <NoConversationsSelected />}
						</section>
					) : (
						<>{isFetching1 ? <Loader /> : <NoMessages />}</>
					)}
				</div>
			</BaseLayout>
			{deleteConversationDialogueOpen && (
				<PromptDialog
					type="warning"
					title="Delete Conversations"
					actionBtnTxt="Delete"
					onClick={deleteConversationsHandler}
					loading={isDeleteChatLoading}>
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

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
	conversationData,
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
import { setConversationLists, setIsDeleteConversationDialogueOpen, setSocket } from "redux/chat/chatSlice";
import { useLazyDeleteMessagesQuery, useLazyGetConversationListsQuery } from "services/chat";
import Loader from "components/UI/Loader";
import { showToast } from "utils";
import { io } from "socket.io-client";
import { getCookie } from "typescript-cookie";

let socket: any = null;

const Chat: React.FC = () => {
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
	const conversationDatas = useSelector(conversationData);
	const strQuery = useSelector(strQueries);

	const [getConversationLists, { data: conversationListsData, isLoading: isLoading1, isFetching: isFetching1 }] =
		useLazyGetConversationListsQuery();
	const [deleteMessages, { data, isLoading: isLoading2, isFetching }] = useLazyDeleteMessagesQuery();

	useEffect(() => {
		const fetchData = async () => {
			const { error, data } = await getConversationLists(strQuery);

			if (data) {
				dispatch(setConversationLists(data));
			}

			if (error) {
				showToast("There is error in fetching Conversation Lists, please try again later  ", "error");
			}
		};

		fetchData();
	}, []);

	const deleteStrQueries = new URLSearchParams({
		ids: ["abcd", "efg"],
	}).toString();

	const deleteMessage = async () => {
		const { error, data } = await deleteMessages({
			conversation_id: conversationDatas?.id,
			message_id_list: "",
		});

		if (error) {
			showToast("There is error in deleting text msg , please try again later  ", "error");
		} else {
			showToast("message deleted successfully", "info");
			dispatch(setIsDeleteConversationDialogueOpen(false));
		}
	};

	const deleteConversationsHandler = () => {
		deleteMessage();
	};

	// socket.io
	useEffect(() => {
		const API_KEY = getCookie("id_token");

		if (socket != null) {
			socket.disconnect();
			socket.offAny();
		}

		socket = io("https://ssp-backend.ringplan.com", {
			path: "/ws",
			transports: ["websocket"],
			secure: true,
			autoConnect: false,
			reconnectionDelay: 1500,
		});

		socket.on("connect", () => {
			socket.emit("authenticate", { token: API_KEY });
		});

		socket.on("authenticated", (data) => {
			// console.log("web socket Authentication successful.", data);

			dispatch(setSocket(socket));
		});

		socket.connect();

		// Clean-up function to disconnect the socket when component unmounts
		return () => {
			socket.disconnect();
		};
	}, []);

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
					loading={isLoading2}>
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

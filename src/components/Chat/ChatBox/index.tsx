import styles from "./ChatBox.module.scss";
import { useEffect, useState } from "react";
import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import ReceiveImg from "./ReceiveImg";
import SendImg from "./SendImg";
import SendVideo from "./SendVideo";
import ReceiveVideo from "./ReceiveVideo";
import SendAudio from "./SendAudio";
import ReceiveAudio from "./ReceiveAudio";
import SendDoc from "./SendDoc";
import ReceiveDoc from "./ReceiveDoc";
import { useLazyGetMessagesListsQuery } from "services/chat";
import { showToast } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { conversationData, latestMsgRandomId, msgLists, socket } from "redux/chat/chatSelectors";
import { setMsgLists } from "redux/chat/chatSlice";
import ChatSkeleton from "../ChatSkeleton";
import ReceiveFiles from "./ReceiveFiles";
import SendFiles from "./SendFiles";
import { convertIntoLongDateFormat, longDateFormat } from "helpers/formatDateTime";
import InfoMessage from "./InfoMessage";
import SendContact from "./SendContact";
import ReceiveContact from "./ReceiveContact";
import { setMeetList } from "redux/meet/meetSlice";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const ChatBox = () => {
	const dispatch = useDispatch();
	const conversationDatas = useSelector(conversationData);
	const messageLists = useSelector(msgLists);
	const Socket = useSelector(socket);
	const msgRandomId = useSelector(latestMsgRandomId);

	const [getMessagesLists, { isFetching: isFetching1 }] = useLazyGetMessagesListsQuery();

	const [imgSelected, setImgSelected] = useState(false);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const [endOfTheList, setEndOfTheList] = useState(false);

	const [dateWiseChat, setDateWiseChat] = useState([]);

	function getUnreadMessageIds(messageArray) {
		return messageArray.filter((item) => item.is_read === false).map((item) => item.id);
	}

	useEffect(() => {
		// Assuming messageLists contains the provided message data

		// Create an object to organize messages by date
		const organizedMessages = {};

		// Iterate through the messageLists and organize messages by date
		for (let i = 0; i < messageLists.length; i++) {
			const message = messageLists[i];
			const dateString = new Date(message.created_at).toLocaleDateString(); // Extract date

			// Check if the date exists in the organizedMessages object
			if (!organizedMessages[dateString]) {
				organizedMessages[dateString] = [message]; // If not, create a new array for that date
			} else {
				organizedMessages[dateString].push(message); // If it exists, push the message to the existing array
			}
		}

		// Convert the organizedMessages object to a two-dimensional array
		const dateWiseChatArray = Object.entries(organizedMessages).map(([date, messages]) => ({
			date,
			msg: messages,
		}));

		// This will give you a two-dimensional array with messages organized by date
		// console.log(dateWiseChatArray, "date wise");
		setDateWiseChat(dateWiseChatArray);
	}, [messageLists]);

	useEffect(() => {
		setEndOfTheList(false);
		setPage(1);
		dispatch(setMsgLists([]));

		const searchStrQuery = new URLSearchParams({
			page: 1,
			per_page: perPage,
		}).toString();

		const fetchData = async () => {
			const { error, data } = await getMessagesLists({ id: conversationDatas?.id, queries: searchStrQuery });

			if (data) {
				dispatch(setMsgLists(data));

				const unreadMsgIdLists = getUnreadMessageIds(data);

				if (!Socket || !Socket.connected) return;

				Socket.emit("texting.message.markAsRead", {
					conversation_id: conversationDatas?.id,
					messagesIds: unreadMsgIdLists,
					timezone: userTimeZone,
				});
			}

			if (error) {
				showToast("There is error in fetching Conversation text Lists, please try again later  ", "error");
			}
		};
		fetchData();
	}, [conversationDatas]);

	useEffect(() => {
		if (!Socket || !Socket.connected) return;

		Socket.on("texting.message.new", (data) => {
			console.log("texting.message.new", data);
			if (data?.conversation_id === conversationDatas?.id) {
				if (data?.direction === "outbound") {
					if (data?.files?.length === 0) {
						const updatedLists = messageLists?.map((item) => {
							if (item.id === msgRandomId) {
								// Replace the item object with data object
								return data;
							}
							return item; // Return the original item if no replacement is needed
						});
						dispatch(setMsgLists(updatedLists));
					} else {
						dispatch(setMsgLists([data, ...messageLists]));
					}
				}
				if (data?.direction === "inbound") {
					dispatch(setMsgLists([data, ...messageLists]));
				}
			}
		});
		// Emitting the event and passing data
		// Socket.on(
		// 	"user_status_updated",
		// 	{
		// 		user_id: conversationDatas?.conversationDatas?.[0]?.id,
		// 	},
		// 	(response) => {
		// 		// Callback function to handle the server's response
		// 		console.log("Server response:", response);
		// 	},
		// );
	}, [Socket, messageLists]);

	const chatScrollHandler = (e: any) => {
		if (endOfTheList) return;
		if (isFetching1) {
			return;
		}
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		// When scrolled to the top of the chat
		// if (scrollTop === 0) {
		// 	setPage((prevPage) => prevPage + 1); // Increment page to load older chats
		// }

		if (scrollTop - clientHeight === -scrollHeight) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		if (page === 1) return;
		const searchStrQuery = new URLSearchParams({
			page: page,
			per_page: perPage,
		}).toString();

		const fetchData = async () => {
			const { error, data } = await getMessagesLists({ id: conversationDatas?.id, queries: searchStrQuery });

			if (data) {
				if (data?.length < perPage) {
					setEndOfTheList(true);
				}
				const newLists = [...messageLists, ...data];

				dispatch(setMsgLists(newLists));
			}

			if (error) {
				// console.log("There is an error in fetching message Lists, please try again later");
				// showToast("There is an error in fetching message Lists, please try again later", "error");
				// setPage(page - 1);
			}
		};
		fetchData();
	}, [page]);

	console.log(messageLists, "new message list s ");

	return (
		<div className={`${styles.chatBox} ${imgSelected && styles.chatBox_imgSelected}`} onScroll={chatScrollHandler}>
			{/* 
			<InfoMessage />
			<SendContact />			
			<ReceiveContact /> */}

			{isFetching1 && messageLists.length === 0 ? (
				<div className={styles.loader}>
					{Array(10)
						.fill(null)
						.map((item, index) => (
							<ChatSkeleton key={index} />
						))}
				</div>
			) : (
				<>
					{messageLists?.length === 0 && <div className={styles.noMsg}>No more message </div>}
					{dateWiseChat?.map((items) => (
						<div key={items.date}>
							<div className={styles.date}>{convertIntoLongDateFormat(items.date)}</div>
							{items?.msg
								?.slice()
								.reverse()
								.map((item, index) => {
									if (item?.direction === "inbound") {
										if (item?.text && item?.files?.length === 0) {
											return <ReceiveMessage id={item?.id} text={item?.text} time={item?.created_at} />;
										}
										if (!item?.text && item?.files?.length === 1) {
											return (
												<div>
													{item?.files?.map((data, index) => {
														if (
															data?.mimetype === "image/png" ||
															data?.mimetype === "image/jpeg" ||
															data?.mimetype === "image/jpg" ||
															data?.mimetype === "image/webp"
														) {
															return (
																<ReceiveImg
																	id={item?.id}
																	src={data?.preview?.base64}
																	time={data?.uploaded_at}
																	files={data}
																/>
															);
														}
														if (data?.mimetype === "video/mp4" || data?.mimetype === "video/mov") {
															return (
																<ReceiveVideo
																	id={item?.id}
																	files={data}
																	src={data?.preview?.base64}
																	time={data?.uploaded_at}
																	duration={data?.duration}
																/>
															);
														}

														if (data?.mimetype === "application/pdf" || data?.mimetype === "application/doc") {
															return (
																<ReceiveDoc
																	id={item?.id}
																	files={data}
																	name={data?.name}
																	time={data?.uploaded_at}
																	size={data.size}
																/>
															);
														}
														if (data?.mimetype === "audio/mpeg" || data?.mimetype === "audio/mp3") {
															return (
																<ReceiveAudio
																	id={item?.id}
																	files={data}
																	time={data?.uploaded_at}
																	name={data?.name}
																	duration={data?.duration}
																/>
															);
														}
														return null; // Or handle non-PNG files if needed
													})}
												</div>
											);
										} else {
											// return null; // Or display a message when there are no files
										}
										if ((item.text && item?.files?.length > 0) || (!item.text && item?.files?.length > 1)) {
											return (
												<ReceiveFiles id={item?.id} time={item?.created_at} text={item?.text} files={item?.files} />
											);
										} else {
											return null;
										}
									}
									if (item?.direction === "outbound") {
										if (item?.text && item?.files?.length === 0) {
											return <SendMessage id={item?.id} text={item?.text} time={item?.created_at} />;
										}
										if (!item?.text && item?.files?.length === 1) {
											return (
												<div>
													{item?.files?.map((data, index) => {
														if (
															data?.mimetype === "image/png" ||
															data?.mimetype === "image/jpeg" ||
															data?.mimetype === "image/jpg" ||
															data?.mimetype === "image/webp"
														) {
															return (
																<SendImg
																	id={item?.id}
																	files={data}
																	src={data?.preview?.base64}
																	time={data?.uploaded_at}
																/>
															);
														}
														if (data?.mimetype === "video/mp4" || data?.mimetype === "video/mov") {
															return (
																<SendVideo
																	id={item?.id}
																	files={data}
																	src={data?.preview?.base64}
																	time={data?.uploaded_at}
																	duration={data?.duration}
																/>
															);
														}
														if (data?.mimetype === "application/pdf" || data?.mimetype === "application/doc") {
															return (
																<SendDoc
																	id={item?.id}
																	files={data}
																	name={data?.name}
																	time={data?.uploaded_at}
																	size={data.size}
																/>
															);
														}

														if (data?.mimetype === "audio/mpeg" || data?.mimetype === "audio/mp3") {
															return (
																<SendAudio
																	id={item?.id}
																	files={data}
																	time={data?.uploaded_at}
																	name={data?.name}
																	duration={data?.duration}
																/>
															);
														}
														return null; // Or handle non-PNG files if needed
													})}
												</div>
											);
										}
										if ((item.text && item?.files?.length > 0) || (!item.text && item?.files?.length > 1)) {
											return <SendFiles id={item?.id} time={item?.created_at} text={item?.text} files={item?.files} />;
										} else {
											return null;
										}
									}
								})}
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default ChatBox;

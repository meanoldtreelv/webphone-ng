import styles from "./ChatBox.module.scss";
import { useEffect, useState } from "react";
import ReceiveMessage from "./ReceiveMessage";
import SendMessage from "./SendMessage";
import SendTime from "./SendTime";
import ReceiveTime from "./ReceiveTime";
import ReceiveImg from "./ReceiveImg";
import SendImg from "./SendImg";
import InfoMessage from "./InfoMessage";
import SendVideo from "./SendVideo";
import ReceiveVideo from "./ReceiveVideo";
import SendAudio from "./SendAudio";
import ReceiveAudio from "./ReceiveAudio";
import SendDoc from "./SendDoc";
import ReceiveDoc from "./ReceiveDoc";
import SendContact from "./SendContact";
import ReceiveContact from "./ReceiveContact";
import { useLazyGetMessagesListsQuery } from "services/chat";
import { showToast } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { conversationData, msgLists, socket } from "redux/chat/chatSelectors";
import { setMsgLists } from "redux/chat/chatSlice";
import ChatSkeleton from "../ChatSkeleton";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const ChatBox = () => {
	const dispatch = useDispatch();
	const conversationDatas = useSelector(conversationData);
	const messageLists = useSelector(msgLists);
	const Socket = useSelector(socket);

	const [getMessagesLists, { data, isFetching: isFetching1, isLoading: isLoading1 }] = useLazyGetMessagesListsQuery();

	const [imgSelected, setImgSelected] = useState(false);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(30);
	const [endOfTheList, setEndOfTheList] = useState(false);

	function getUnreadMessageIds(messageArray) {
		return messageArray.filter((item) => item.is_read === false).map((item) => item.id);
	}

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
				dispatch(setMsgLists([data, ...messageLists]));
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

	// console.log("====================================");
	// console.log(conversationDatas?.conversationDatas?.[0]?.id);
	// console.log("====================================");
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
				console.log("There is an error in fetching message Lists, please try again later");

				// showToast("There is an error in fetching message Lists, please try again later", "error");
				// setPage(page - 1);
			}
		};
		fetchData();
	}, [page]);

	return (
		<div className={`${styles.chatBox} ${imgSelected && styles.chatBox_imgSelected}`} onScroll={chatScrollHandler}>
			{/* <ReceiveTime />
			<InfoMessage />
			<SendTime />
			<SendMessage />
			<ReceiveTime />
			<ReceiveMessage />
			<SendTime />
			<SendImg />
			<ReceiveTime />
			<ReceiveImg />
			<SendTime />
			<SendVideo />
			<ReceiveTime />
			<ReceiveVideo />
			<SendTime />
			<SendAudio />
			<ReceiveTime />
			<ReceiveAudio />
			<SendTime />
			<SendDoc />
			<ReceiveTime />
			<ReceiveDoc />
			<SendTime />
			<SendContact />
			<ReceiveTime />
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
					{messageLists?.slice().map((item) => {
						if (item?.direction === "inbound") {
							if (item?.text) {
								return (
									<>
										<ReceiveMessage id={item?.id} text={item?.text} time={item?.created_at} />
									</>
								);
							}
						}
						if (item?.direction === "outbound") {
							if (item?.text) {
								return (
									<>
										{/* <SendTime time={item?.created_at} /> */}
										<SendMessage id={item?.id} text={item?.text} time={item?.created_at} />
									</>
								);
							}
							// if (item.files.length > 0) {
							// 	item?.files?.map((data) => {
							// 		if (data?.mimetype === "image/jpeg") {
							// 			return (
							// 				<>
							// 					<SendTime time={data?.uploaded_at} />
							// 					<SendImg src={data?.preview?.base64} />
							// 				</>
							// 			);
							// 		}
							// 	});
							// }
						}
					})}
				</>
			)}
		</div>
	);
};

export default ChatBox;

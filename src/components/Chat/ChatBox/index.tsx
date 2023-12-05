import styles from "./ChatBox.module.scss";
import { useEffect, useState } from "react";
import ReceiveTime from "./ReceiveTime";
import ReceiveMessage from "./ReceiveMessage";
import SendTime from "./SendTime";
import SendMessage from "./SendMessage";
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
import { useSelector } from "react-redux";
import { conversationData, socket } from "redux/chat/chatSelectors";
import Loader from "components/UI/Loader";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const ChatBox = () => {
	const conversationDatas = useSelector(conversationData);
	const Socket = useSelector(socket);

	const [getMessagesLists, { data, isFetching: isFetching1, isLoading: isLoading1 }] = useLazyGetMessagesListsQuery();

	const [imgSelected, setImgSelected] = useState(false);
	const [perPage, setPerPage] = useState(30);
	const [messageList, setMessageList] = useState([]);

	function getUnreadMessageIds(messageArray) {
		return messageArray.filter((item) => item.is_read === false).map((item) => item.id);
	}

	useEffect(() => {
		const searchStrQuery = new URLSearchParams({
			page: 1,
			per_page: perPage,
		}).toString();

		const fetchData = async () => {
			const { error, data } = await getMessagesLists({ id: conversationDatas?.id, queries: searchStrQuery });

			if (data) {
				setMessageList(data);

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
		Socket.on("texting.message.new", (data) => {
			// console.log("texting.message.new", data);

			setMessageList((prevList) => [data, ...prevList]);

			// Do something with the received data, like updating state
		});
	}, [Socket]);

	return (
		<div className={`${styles.chatBox} ${imgSelected && styles.chatBox_imgSelected}`}>
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
			{isFetching1 ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<>
					{messageList
						?.slice()
						.reverse()
						.map((item) => {
							if (item?.direction === "inbound") {
								if (item?.text) {
									return (
										<>
											<ReceiveTime time={item?.created_at} />
											<ReceiveMessage text={item?.text} />
										</>
									);
								}
							}
							if (item?.direction === "outbound") {
								if (item?.text) {
									return (
										<>
											<SendTime time={item?.created_at} />
											<SendMessage text={item?.text} />
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

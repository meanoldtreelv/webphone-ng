import { useEffect, useState } from "react";
import styles from "./ConversationsSortingPopUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setConversationLists, setIsSortingMessagePopUpOpen, setQueries } from "redux/chat/chatSlice";
import { conversationLists } from "redux/chat/chatSelectors";
import { filterUnreadMessagesToTop, sortConversationsByLastMessage } from "helpers";

const ConversationsSortingPopUp = () => {
	const dispatch = useDispatch();
	const conversationsLists = useSelector(conversationLists);
	const [sortType, setSortType] = useState("lastActivity");

	useEffect(() => {
		if (sortType === "unreadTop") {
			// todo - function filterUnreadMessagesToTop may need to modify, it may not working propely
			const filteredLists = filterUnreadMessagesToTop(conversationsLists);
			dispatch(setConversationLists(filteredLists));
		}
		if (sortType === "lastActivity") {
			// todo - function sortConversationsByLastMessage may need to modify, it may not working propely
			const filteredLists = sortConversationsByLastMessage(conversationsLists);
			dispatch(setConversationLists(filteredLists));
		}
	}, [sortType]);

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Sorting</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					setSortType("unreadTop");
					// dispatch(setIsSortingMessagePopUpOpen(false));
				}}>
				<input type="radio" name="sorting" id="unreadTop" checked={sortType === "unreadTop"} />
				<label htmlFor="unreadTop">Unread to the top</label>
			</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					setSortType("lastActivity");
					// dispatch(setIsSortingMessagePopUpOpen(false));
				}}>
				<input type="radio" name="sorting" id="lastActivity" checked={sortType === "lastActivity"} />
				<label htmlFor="lastActivity">Last activity time</label>
			</div>
		</div>
	);
};

export default ConversationsSortingPopUp;

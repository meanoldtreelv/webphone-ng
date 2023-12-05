import { useEffect, useState } from "react";
import styles from "./ConversationsSortingPopUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setConversationLists, setQueries, setSortConversationType } from "redux/chat/chatSlice";
import { conversationLists, sortConversationType } from "redux/chat/chatSelectors";
import { filterUnreadMessagesToTop, sortConversationsByLastMessage } from "helpers";

const ConversationsSortingPopUp = () => {
	const dispatch = useDispatch();
	const conversationsLists = useSelector(conversationLists);
	const sortConversationTypes = useSelector(sortConversationType);
	// const [sortType, setSortType] = useState("lastActivity");

	// useEffect(() => {
	// 	if (sortConversationTypes === "unreadTop") {
	// 		// todo - function filterUnreadMessagesToTop may need to modify, it may not working propely
	// 		const filteredLists = filterUnreadMessagesToTop(conversationsLists);
	// 		dispatch(setConversationLists(filteredLists));
	// 	}
	// 	if (sortConversationTypes === "lastActivity") {
	// 		// todo - function sortConversationsByLastMessage may need to modify, it may not working propely
	// 		const filteredLists = sortConversationsByLastMessage(conversationsLists);
	// 		dispatch(setConversationLists(filteredLists));
	// 	}
	// }, [sortConversationTypes]);

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Sorting</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					// setSortType("unreadTop");
					dispatch(setSortConversationType("unreadTop"));
					dispatch(
						setQueries({
							page: 1,
							per_page: 20,
							sort: "unread",
						}),
					);
					// dispatch(setIsSortingMessagePopUpOpen(false));
				}}>
				<input type="radio" name="sorting" id="unreadTop" checked={sortConversationTypes === "unreadTop"} />
				<label htmlFor="unreadTop">Unread to the top</label>
			</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					// setSortType("lastActivity");
					dispatch(setSortConversationType("lastActivity"));
					dispatch(
						setQueries({
							page: 1,
							per_page: 20,
							sort: "last_activity",
						}),
					);
					// dispatch(setIsSortingMessagePopUpOpen(false));
				}}>
				<input type="radio" name="sorting" id="lastActivity" checked={sortConversationTypes === "lastActivity"} />
				<label htmlFor="lastActivity">Last activity time</label>
			</div>
		</div>
	);
};

export default ConversationsSortingPopUp;

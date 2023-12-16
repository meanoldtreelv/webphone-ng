import styles from "./ConversationsSortingPopUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setQueries, setSortConversationType } from "redux/chat/chatSlice";
import { conversationLists, sortConversationType } from "redux/chat/chatSelectors";

const ConversationsSortingPopUp = () => {
	const dispatch = useDispatch();
	const sortConversationTypes = useSelector(sortConversationType);

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Sorting</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					dispatch(setSortConversationType("unreadTop"));
					dispatch(
						setQueries({
							page: 1,
							per_page: 20,
							sort: "unread",
						}),
					);
				}}>
				<input type="radio" name="sorting" id="unreadTop" checked={sortConversationTypes === "unreadTop"} />
				<label htmlFor="unreadTop">Unread to the top</label>
			</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					dispatch(setSortConversationType("lastActivity"));
					dispatch(
						setQueries({
							page: 1,
							per_page: 20,
							sort: "last_activity",
						}),
					);
				}}>
				<input type="radio" name="sorting" id="lastActivity" checked={sortConversationTypes === "lastActivity"} />
				<label htmlFor="lastActivity">Last activity time</label>
			</div>
		</div>
	);
};

export default ConversationsSortingPopUp;

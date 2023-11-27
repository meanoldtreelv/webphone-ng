import { useState } from "react";
import styles from "./ConversationsSortingPopUp.module.scss";

const ConversationsSortingPopUp = () => {
	const [sortType, setSortType] = useState("unreadTop");

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Sorting</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					setSortType("unreadTop");
				}}>
				<input type="radio" name="sorting" id="unreadTop" checked={sortType === "unreadTop"} />
				<label htmlFor="unreadTop">Unread to the top</label>
			</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					setSortType("lastActivity");
				}}>
				<input type="radio" name="sorting" id="lastActivity" checked={sortType === "lastActivity"} />
				<label htmlFor="lastActivity">Last activity time</label>
			</div>
		</div>
	);
};

export default ConversationsSortingPopUp;

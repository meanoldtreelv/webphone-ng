import { useState } from "react";
import styles from "./StartNewConversations.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import Conversations from "./Conversations";
import Group from "./Group";
import { useDispatch } from "react-redux";
import { setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";

const StartNewConversations = () => {
	const dispatch = useDispatch();
	const [tabActive, setTabActive] = useState("conversations");

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Start New Conversation</span>
					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsStartNewConversationDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>
				<div className={styles.tabBar}>
					<span
						className={`${tabActive === "conversations" ? styles.active : ""}`}
						onClick={() => {
							setTabActive("conversations");
						}}>
						Conversation
					</span>
					<span
						className={`${tabActive === "group" ? styles.active : ""}`}
						onClick={() => {
							setTabActive("group");
						}}>
						Group
					</span>
					<span
						className={`${tabActive === "campaign" ? styles.active : ""}`}
						onClick={() => {
							setTabActive("campaign");
						}}>
						Campaign
					</span>
				</div>
				{tabActive === "conversations" && <Conversations />}
				{tabActive === "group" && <Group />}
			</div>
		</div>
	);
};

export default StartNewConversations;

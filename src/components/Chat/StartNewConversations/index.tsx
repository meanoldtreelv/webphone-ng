import { useState } from "react";
import styles from "./StartNewConversations.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import Conversations from "./Conversations";

const StartNewConversations = () => {
	const [tabActive, setTabActive] = useState("conversations");

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Start New Conversation</span>
					<span className={styles.close}>
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
				<Conversations />
			</div>
		</div>
	);
};

export default StartNewConversations;

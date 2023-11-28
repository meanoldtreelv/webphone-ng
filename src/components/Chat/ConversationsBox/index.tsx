import styles from "./ConversationsBox.module.scss";
import ConversationsHeader from "../ConversationsHeader";
import ConversationsFooter from "../ConversationsFooter";
import ChatBox from "../ChatBox";

const ConversationsBox = () => {
	return (
		<div className={styles.conversationsBox}>
			<ConversationsHeader />
			<ChatBox />
			<ConversationsFooter />
		</div>
	);
};

export default ConversationsBox;

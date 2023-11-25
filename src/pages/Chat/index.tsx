import BaseLayout from "layouts/BaseLayout";
import { useEffect } from "react";
import styles from "./Chat.module.scss";
import NoMessages from "components/chat/NoMessages";
import ConversationsList from "components/chat/ConversationsList";
import ContactDetails from "components/Contact/ContactDetails";
import NoConversationsSelected from "components/chat/NoConversationsSelected";
import ConversationsBox from "components/chat/ConversationsBox";
import PromptDialog from "components/Modal/PromptDialog";
import StartNewConversations from "components/chat/StartNewConversations";

const Chat = () => {
	useEffect(() => {
		const fetchData = async () => {};

		fetchData();
	}, []);

	return (
		<div className={styles.chat}>
			<BaseLayout>
				<div className={styles.noMessageBox}>
					{true ? (
						<section className={styles.contact_container}>
							<ConversationsList />
							{true ? <ConversationsBox /> : <NoConversationsSelected />}
						</section>
					) : (
						<NoMessages />
					)}
				</div>
			</BaseLayout>
			{false && (
				<PromptDialog
					type="warning"
					title="Delete Conversations"
					actionBtnTxt="Delete"
					// onClick={deleteConversationsHandler}
					// loading={isLoading}
				>
					Are you sure that you want to delete conversation ?
				</PromptDialog>
			)}
			{true && <StartNewConversations />}
		</div>
	);
};

export default Chat;

import BaseLayout from "layouts/BaseLayout";
import { useEffect } from "react";
import styles from "./Chat.module.scss";
import NoMessages from "components/Chat/NoMessages";
import ConversationsList from "components/Chat/ConversationsList";
import NoConversationsSelected from "components/Chat/NoConversationsSelected";
import ConversationsBox from "components/Chat/ConversationsBox";
import PromptDialog from "components/Modal/PromptDialog";
import StartNewConversations from "components/Chat/StartNewConversations";
import AddMember from "components/Chat/AddMember";
import ImgViewer from "components/Chat/Viewer/ImgViewer";
import VideoViewer from "components/Chat/Viewer/VideoViewer";
import AudioViewer from "components/Chat/Viewer/AudioViewer";
import DocumentViewer from "components/Chat/Viewer/DocumentViewer";
import ShareContactDialogue from "components/Chat/ShareContactDialogue";

const Chat = () => {
	useEffect(() => {
		const fetchData = async () => {};

		fetchData();
	}, []);

	const deleteConversationsHandler = () => {};

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
					onClick={deleteConversationsHandler}
					// loading={isLoading}
				>
					Are you sure that you want to delete conversation ?
				</PromptDialog>
			)}
			{false && <StartNewConversations />}
			{false && <AddMember />}
			{false && <ImgViewer />}
			{false && <VideoViewer />}
			{false && <AudioViewer />}
			{false && <DocumentViewer />}
			{false && <ShareContactDialogue />}
		</div>
	);
};

export default Chat;

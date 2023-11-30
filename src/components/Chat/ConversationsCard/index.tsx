import React from "react";
import styles from "./ConversationsCard.module.scss";
import UserIcon from "components/UI/Icons/ChatIcons/User";
import GroupIcon from "components/UI/Icons/ChatIcons/Group";
import { useDispatch } from "react-redux";
import { setConversationData, setIsConversationSelected } from "redux/chat/chatSlice";
import { limitCharacter } from "helpers";

const ConversationsCard: React.FC = ({ conversationData }) => {
	const dispatch = useDispatch();
	return (
		<button
			className={styles.contact}
			onClick={() => {
				dispatch(setIsConversationSelected(true));
				dispatch(setConversationData(conversationData));
			}}>
			{conversationData?.conversation_type === "group" ? (
				<span className={styles.groupIcon}>
					<GroupIcon />
				</span>
			) : (
				<span className={styles.contact_circle}>BD</span>
			)}

			<div className={styles.contact_name}>
				<div>
					<span className={styles.name}>
						{conversationData?.conversation_type === "group"
							? conversationData?.campaign_info?.name
							: conversationData?.contactsinfo?.[0]?.first_name + " " + conversationData?.contactsinfo?.[0]?.last_name}
					</span>
					<span className={styles.dateTime}>{conversationData?.last_message_created_at}</span>
				</div>
				<div>
					<span className={styles.msg}>
						{conversationData?.conversation_type === "group" && (
							<span>
								<UserIcon /> {conversationData?.contactsinfo.length}
							</span>
						)}

						{limitCharacter(conversationData?.last_msg?.text, 50)}
					</span>
					{conversationData?.unread_msg_count > 0 && (
						<span className={styles.unread}>{conversationData?.unread_msg_count}</span>
					)}
				</div>
			</div>
		</button>
	);
};

export default ConversationsCard;

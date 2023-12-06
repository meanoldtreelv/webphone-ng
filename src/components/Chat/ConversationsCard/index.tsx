import React from "react";
import styles from "./ConversationsCard.module.scss";
import UserIcon from "components/UI/Icons/ChatIcons/User";
import GroupIcon from "components/UI/Icons/ChatIcons/Group";
import { useDispatch } from "react-redux";
import { setConversationData, setIsConversationSelected } from "redux/chat/chatSlice";
import { limitCharacter } from "helpers";
import { contactAbbreviation } from "utils";
import { recentDateFormat } from "helpers/formatDateTime";

const ConversationsCard: React.FC = ({ conversationData }) => {
	const dispatch = useDispatch();

	const first_name = conversationData?.contactsinfo?.[0]?.first_name;
	const last_name = conversationData?.contactsinfo?.[0]?.last_name;
	const phone = conversationData?.contactsinfo?.[0]?.number;

	let firstName: string;
	let lastName: string;

	if (first_name === "undefine" || first_name === null) {
		firstName = "";
	} else {
		firstName = first_name;
	}

	if (last_name === "undefine" || last_name === null) {
		lastName = "";
	} else {
		lastName = last_name;
	}

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
				<span className={styles.contact_circle}>
					{contactAbbreviation(
						conversationData?.contactsinfo?.[0]?.first_name,
						conversationData?.contactsinfo?.[0]?.last_name,
						conversationData?.contactsinfo?.[0]?.number,
						"",
					)}
				</span>
			)}

			<div className={styles.contact_name}>
				<div>
					<span className={styles.name}>
						{conversationData?.conversation_type === "group"
							? conversationData?.campaign_info?.name
							: firstName + lastName
							? firstName + " " + lastName
							: phone}
					</span>
					<span className={styles.dateTime}>{recentDateFormat(conversationData?.last_message_created_at)}</span>
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

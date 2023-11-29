import React from "react";
import styles from "./ConversationsCard.module.scss";
import UserIcon from "components/UI/Icons/ChatIcons/User";
import GroupIcon from "components/UI/Icons/ChatIcons/Group";
import { useDispatch } from "react-redux";
import { setIsConversationSelected } from "redux/chat/chatSlice";

const ConversationsCard: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<button
			className={styles.contact}
			onClick={() => {
				dispatch(setIsConversationSelected(true));
			}}>
			{true ? (
				<span className={styles.groupIcon}>
					<GroupIcon />
				</span>
			) : (
				<span className={styles.contact_circle}>BD</span>
			)}

			<div className={styles.contact_name}>
				<div>
					<span className={styles.name}>Shivam Gupta</span>
					<span className={styles.dateTime}>9:54 AM</span>
				</div>
				<div>
					<span className={styles.msg}>
						<span>
							<UserIcon /> 8
						</span>
						Hello I am testing the chat...
					</span>
					{true && <span className={styles.unread}>12</span>}
				</div>
			</div>
		</button>
	);
};

export default ConversationsCard;

import { useState } from "react";
import styles from "./ConversationsHeader.module.scss";
import UserStatusIcon from "components/UI/Icons/UserStatus";
import DeleteIcon from "components/UI/Icons/Delete";
import CallIcon from "components/UI/Icons/ChatIcons/Call";
import InfoIcon from "components/UI/Icons/ChatIcons/Info";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteConversationDialogueOpen } from "redux/chat/chatSlice";
import { conversationData, isDeleteConversationDialogueOpen } from "redux/chat/chatSelectors";
import { contactAbbreviation } from "utils";

const ConversationsHeader = () => {
	const dispatch = useDispatch();
	const deleteConversationDialogueOpen = useSelector(isDeleteConversationDialogueOpen);
	const conversationDatas = useSelector(conversationData);

	const [deleteIconHover, setDeleteIconHover] = useState(false);

	const first_name = conversationDatas?.contactsinfo?.[0]?.first_name;
	const last_name = conversationDatas?.contactsinfo?.[0]?.last_name;
	const phone = conversationDatas?.contactsinfo?.[0]?.number;

	return (
		<div className={styles.header}>
			<div className={styles.left}>
				{conversationDatas?.conversation_type === "group" ? (
					<span className={styles.initials_group}>
						<UserGroupIcon />
					</span>
				) : (
					<span className={styles.initials}>
						{contactAbbreviation(first_name, last_name, phone, "")}
						<span>
							<UserStatusIcon />
						</span>
					</span>
				)}

				<div className={styles.contact}>
					<span className={styles.name}>
						{conversationDatas?.conversation_type === "group"
							? conversationDatas?.campaign_info?.name
							: first_name + last_name
							? first_name + " " + last_name
							: ""}
					</span>
					{conversationDatas?.conversation_type === "direct" && (
						<span className={styles.number}>{conversationDatas?.contactsinfo?.[0]?.number}</span>
					)}
				</div>
			</div>
			<div className={styles.right}>
				<span className={styles.icon}>
					<CallIcon />
				</span>
				<span className={styles.icon}>
					<InfoIcon />
				</span>
				<span
					onMouseOver={() => {
						setDeleteIconHover(true);
					}}
					onMouseOut={() => {
						setDeleteIconHover(false);
					}}
					onClick={() => {
						dispatch(setIsDeleteConversationDialogueOpen(true));
					}}
					className={`${styles.delete} ${deleteConversationDialogueOpen ? styles.delete_active : ""}`}>
					<DeleteIcon
						color={deleteIconHover || deleteConversationDialogueOpen ? "support-danger-default" : "icon-primary"}
					/>
				</span>
			</div>
		</div>
	);
};

export default ConversationsHeader;

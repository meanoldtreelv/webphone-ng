import { useEffect, useState } from "react";
import styles from "./ConversationsHeader.module.scss";
import UserStatusIcon from "components/UI/Icons/UserStatus";
import DeleteIcon from "components/UI/Icons/Delete";
import CallIcon from "components/UI/Icons/ChatIcons/Call";
import InfoIcon from "components/UI/Icons/ChatIcons/Info";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteConversationDialogueOpen } from "redux/chat/chatSlice";
import { conversationData, isDeleteConversationDialogueOpen, socket } from "redux/chat/chatSelectors";
import { contactAbbreviation } from "utils";

const ConversationsHeader = () => {
	const dispatch = useDispatch();
	const deleteConversationDialogueOpen = useSelector(isDeleteConversationDialogueOpen);
	const conversationDatas = useSelector(conversationData);
	const Socket = useSelector(socket);

	const [deleteIconHover, setDeleteIconHover] = useState(false);

	const first_name = conversationDatas?.contactsinfo?.[0]?.first_name;
	const last_name = conversationDatas?.contactsinfo?.[0]?.last_name;
	const phone = conversationDatas?.contactsinfo?.[0]?.number;

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

	useEffect(() => {
		if (!Socket || !Socket.connected) return;

		Socket.on("user_status_updated", (data) => {
			console.log("user_status_updated", data);

			// Do something with the received data, like updating user status
		});
	}, [Socket]);

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
							: firstName + lastName
							? firstName + " " + lastName
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

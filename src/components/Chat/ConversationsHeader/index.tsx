import { useEffect, useState } from "react";
import styles from "./ConversationsHeader.module.scss";
import UserStatusIcon from "components/UI/Icons/UserStatus";
import DeleteIcon from "components/UI/Icons/Delete";
import CallIcon from "components/UI/Icons/ChatIcons/Call";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import { useDispatch, useSelector } from "react-redux";
import { setConversationData, setConversationLists, setIsDeleteConversationDialogueOpen } from "redux/chat/chatSlice";
import {
	conversationData,
	conversationLists,
	isDeleteConversationDialogueOpen,
	socket,
} from "redux/chat/chatSelectors";
import { contactAbbreviation, showToast } from "utils";
import CheckIcon from "components/UI/Icons/ChatIcons/Check";
import ThreeDots from "components/UI/Icons/meet/ThreeDots";
import MoreMenuPopUp from "./MoreMenuPopUp";
import PinIcon from "components/UI/Icons/Pin";
import UnpinIcon from "components/UI/Icons/UnPin";
import { useLazyPinUnpinConversationQuery } from "services/chat";
import { ClipLoader } from "react-spinners";

const ConversationsHeader = () => {
	const dispatch = useDispatch();

	const deleteConversationDialogueOpen = useSelector(isDeleteConversationDialogueOpen);
	const conversationDatas = useSelector(conversationData);
	const conversationsList = useSelector(conversationLists);
	const Socket = useSelector(socket);

	const [pinUnpinConversation, { isFetching: isFetching1 }] = useLazyPinUnpinConversationQuery();

	const [deleteIconHover, setDeleteIconHover] = useState(false);
	const [isMoreMenu, setIsMoreMenu] = useState(false);

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

	const unPinHandler = async () => {
		const { data, error } = await pinUnpinConversation({
			id: conversationDatas?.id,
			data: {
				pin: false,
			},
		});
		if (data) {
			dispatch(setConversationData(data));
			showToast("Un-pinned successfully", "success");
			const lists = [...conversationsList];

			// Update the lists array where item.id matches the provided itemIdToUpdate
			const updatedLists = lists?.map((item) => {
				if (item?.id === conversationDatas?.id) {
					return { ...item, pinned_at: null };
				}
				return item;
			});
			dispatch(setConversationLists(updatedLists));
		}
		if (error) {
			showToast("Something went wrong", "warning");
		}
	};

	const pinHandler = async () => {
		const { data, error } = await pinUnpinConversation({
			id: conversationDatas?.id,
			data: {
				pin: true,
			},
		});
		if (data) {
			dispatch(setConversationData(data));
			showToast("Pinned successfully", "success");
			const lists = [...conversationsList];

			// Update the lists array where item.id matches the provided itemIdToUpdate
			const updatedLists = lists?.map((item) => {
				if (item?.id === conversationDatas?.id) {
					return { ...item, pinned_at: data.pinned_at };
				}
				return item;
			});
			dispatch(setConversationLists(updatedLists));
		}
		if (error) {
			showToast("Something went wrong", "warning");
		}
	};

	return (
		<div className={styles.header}>
			<div className={styles.left}>
				{conversationDatas?.conversation_type === "group" || conversationDatas?.conversation_type === "campaign" ? (
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
						{conversationDatas?.conversation_type === "group" || conversationDatas?.conversation_type === "campaign"
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
					{conversationDatas?.pinned_at ? (
						<span onClick={unPinHandler}>
							{isFetching1 ? <ClipLoader size={14} color="var(--text-secondary)" /> : <UnpinIcon />}
						</span>
					) : (
						<span onClick={pinHandler}>
							{isFetching1 ? <ClipLoader size={14} color="var(--text-secondary)" /> : <PinIcon />}
						</span>
					)}
				</span>
				<span className={styles.icon}>
					<CheckIcon />
				</span>
				<span className={styles.icon}>
					<CallIcon />
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
				<span
					className={styles.icon}
					onClick={() => {
						setIsMoreMenu(!isMoreMenu);
					}}>
					<ThreeDots />
				</span>
				{isMoreMenu && <MoreMenuPopUp />}
			</div>
		</div>
	);
};

export default ConversationsHeader;

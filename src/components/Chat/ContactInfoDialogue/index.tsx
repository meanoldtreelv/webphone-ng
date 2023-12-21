import { useState } from "react";
import styles from "./ContactInfoDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setEditContact, setIsContactDetailsDialogueOpen, setIsEditContactDialogueOpen } from "redux/chat/chatSlice";
import { conversationData } from "redux/chat/chatSelectors";
import BtnAction from "components/UI/BtnAction";

const ContactBar = ({ contact }) => {
	const dispatch = useDispatch();

	const [contactHovered, setContactHovered] = useState(false);

	return (
		<div
			className={styles.contact}
			onMouseOver={() => {
				setContactHovered(true);
			}}
			onMouseOut={() => {
				setContactHovered(false);
			}}>
			<div>
				<span className={styles.name}>{contact?.first_name + " " + contact.last_name}</span>
				<span className={styles.number}>{contact?.number}</span>
			</div>
			{contactHovered && (
				<span
					className={styles.edit}
					onClick={() => {
						dispatch(setEditContact(contact));
						dispatch(setIsEditContactDialogueOpen(true));
						dispatch(setIsContactDetailsDialogueOpen(false));
					}}>
					<EditIcon />
				</span>
			)}
		</div>
	);
};

const ContactInfoDialogue = () => {
	const dispatch = useDispatch();

	const [cancelHover, setCancelHover] = useState(false);
	const conversationsData = useSelector(conversationData);

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>
						{conversationsData?.conversation_type === "group" &&
							`Group Members (${conversationsData?.contactsinfo.length})`}
						{conversationsData?.conversation_type === "campaign" &&
							`Campaign Members (${conversationsData?.contactsinfo.length})`}
						{conversationsData?.conversation_type === "direct" && `Contact Info`}
					</span>
					<BtnAction
						btnType={"normal"}
						isDisabled={false}
						type="button"
						isActive={false}
						onMouseOut={() => {
							setCancelHover(false);
						}}
						onMouseOver={() => {
							setCancelHover(true);
						}}
						onClick={() => {
							dispatch(setIsContactDetailsDialogueOpen(false));
						}}
						icon={<CloseIcon color={cancelHover ? "primary-default" : "icon-primary"} />}
					/>
					{/* <span
						className={styles.close}
						onClick={() => {
							dispatch(setIsContactDetailsDialogueOpen(false));
						}}>
						<CloseIcon />
					</span> */}
				</div>
				<div className={styles.contactCardBox}>
					{conversationsData?.contactsinfo?.map((contact) => <ContactBar key={contact.id} contact={contact} />)}
				</div>
			</div>
		</div>
	);
};

export default ContactInfoDialogue;

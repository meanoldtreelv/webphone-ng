import React, { useState } from "react";
import styles from "./ContactInfoDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import { useDispatch } from "react-redux";
import { setIsContactDetailsDialogueOpen, setIsEditContactDialogueOpen } from "redux/chat/chatSlice";

const ContactBar = () => {
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
				<span className={styles.name}>Shivam Gupta</span>
				<span className={styles.number}>987258126885</span>
			</div>
			{contactHovered && (
				<span
					className={styles.edit}
					onClick={() => {
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
	const [contactHovered, setContactHovered] = useState(false);

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Contact Info </span>
					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsContactDetailsDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>
				<div className={styles.contactCardBox}>
					<ContactBar />
					<ContactBar />
				</div>
			</div>
		</div>
	);
};

export default ContactInfoDialogue;

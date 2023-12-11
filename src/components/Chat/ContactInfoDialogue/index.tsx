import React from "react";
import styles from "./ContactInfoDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";

const ContactInfoDialogue = () => {
	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Contact Info </span>
					<span
						className={styles.close}
						onClick={() => {
							// dispatch(setIsAddMemberDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>
				<div>
					<div className={styles.contact}>
						<div>
							<span className={styles.name}>Shivam Gupta</span>
							<span className={styles.number}>987258126885</span>
						</div>
						<span>
							<EditIcon />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactInfoDialogue;

import React from "react";
import styles from "./SendMessageDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import MessageIcon from "components/UI/Icons/Sidecar/Message";
import CloseIcon from "components/UI/Icons/Close";
import ContactBookIcon from "components/UI/Icons/ContactBook";

const SendMessageDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<MessageIcon />
						<span>Send Message</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>

				<div className={styles.row}>
					<label htmlFor="">From</label>
					<select name="" id="">
						<option value="123456499">123456499</option>
					</select>
				</div>

				<div className={styles.row}>
					<label htmlFor="">To number</label>
					<input type="text" />
					<span>
						<ContactBookIcon />
					</span>
				</div>

				<textarea name="" id="" rows="5" placeholder="Enter message" className={styles.textarea}></textarea>

				<div className={styles.btnBox}>
					<button>Add Action</button>
				</div>
			</div>
		</>
	);
};

export default SendMessageDialogue;

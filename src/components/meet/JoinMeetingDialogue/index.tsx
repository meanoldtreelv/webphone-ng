import Backdrop from "components/UI/Backdrop";
import React from "react";
import styles from "./JoinMeetingDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import ContactBookIcon from "components/UI/Icons/ContactBook";

const JoinMeetingDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Join Meeting</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>
				<p className={styles.desc}>Enter a meeting code provided by the meeting organizer</p>

				<div className={styles.row}>
					<label htmlFor="">Code</label>
					<input type="text" />
					{/* <span>
						<ContactBookIcon />
					</span> */}
				</div>

				<div className={styles.btnBox}>
					<button>Join</button>
				</div>
			</div>
		</>
	);
};

export default JoinMeetingDialogue;

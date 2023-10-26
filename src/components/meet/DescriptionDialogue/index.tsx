import Backdrop from "components/UI/Backdrop";
import React, { useState } from "react";
import styles from "./DescriptionDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import LockIcon from "components/UI/Icons/Lock";
import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import { useDispatch } from "react-redux";
import { setDescriptionDialogue } from "redux/meet/meetSlice";

const DescriptionDialogue = () => {
	const dispatch = useDispatch();
	const [meetingCode, setMeetingCode] = useState("");

	const joinHandler = () => {
		if (+meetingCode <= 99999999) {
			return;
		} else {
			window.open(`https://meet.ringplan.com/auth/?id=${meetingCode}`, "_blank");
			setMeetingCode("");
			// dispatch(setJoinDialogue(false));
		}
	};

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<LockIcon />
						<span>Test Meet</span>
					</span>

					<span
						onClick={() => {
							dispatch(setDescriptionDialogue(false));
						}}>
						<CloseIcon />
					</span>
				</h1>
				<div className={styles.dateBox}>
					<div>
						<div className={styles.date}>Tuesday, October 24 - 10:15-11:15</div>
						<div className={styles.date}>Daily, until Oct 24, 2023</div>
					</div>
					<button className={styles.edit}>Edit</button>
				</div>

				<label>Description</label>
				<div className={styles.date}>Hello I am testing</div>
				<label>Password</label>
				<div className={styles.password}>
					<span>************</span>
					<></>
					<CopyIcon />
				</div>
				<div className={styles.date}>
					2 Attendees, <span>1 Yes, 1 Awaiting</span>
				</div>
				<div className={styles.organizer}>
					<p>
						Shivam Gupta <span>(Organizer)</span>
					</p>
					<p className={styles.email}>gshivam@startxlabs.in</p>
				</div>
				<div className={styles.attendee}>shivamguptakrm@gmail.com</div>

				<div className={styles.btnBox}>
					<button className={styles.delete}>Delete</button>
					<button onClick={joinHandler}>Join</button>
				</div>
			</div>
		</>
	);
};

export default DescriptionDialogue;

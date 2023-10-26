import Backdrop from "components/UI/Backdrop";
import React, { useState } from "react";
import styles from "./JoinMeetingDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import ContactBookIcon from "components/UI/Icons/ContactBook";
import { useDispatch } from "react-redux";
import { setJoinDialogue } from "redux/meet/meetSlice";
import { joinDialogue } from "redux/meet/meetSelectors";

const JoinMeetingDialogue = () => {
	const dispatch = useDispatch();
	const [meetingCode, setMeetingCode] = useState("");

	const joinHandler = () => {
		if (+meetingCode <= 99999999) {
			return;
		} else {
			window.open(`https://meet.ringplan.com/auth/?id=${meetingCode}`, "_blank");
			setMeetingCode("");
			dispatch(setJoinDialogue(false));
		}
	};
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Join Meeting</span>
					</span>

					<span
						onClick={() => {
							dispatch(setJoinDialogue(false));
						}}>
						<CloseIcon />
					</span>
				</h1>
				<p className={styles.desc}>Enter a meeting code provided by the meeting organizer</p>

				<div className={styles.row}>
					<label htmlFor="">Code</label>
					<input
						type="text"
						value={meetingCode}
						onChange={(e) => {
							setMeetingCode(e.target.value);
						}}
					/>
					{/* <span>
						<ContactBookIcon />
					</span> */}
				</div>

				<div className={styles.btnBox}>
					<button onClick={joinHandler}>Join</button>
				</div>
			</div>
		</>
	);
};

export default JoinMeetingDialogue;

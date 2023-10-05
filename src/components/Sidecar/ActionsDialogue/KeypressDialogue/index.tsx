import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import React from "react";
import styles from "./KeypressDialogue.module.scss";
import KeypressIcon from "components/UI/Icons/Sidecar/Keypress";
import VoicemailIcon from "components/UI/Icons/Sidebar/Voicemail";

const KeypressDialogue = () => {
	const keyArray = [
		{ number: "1", letter: <VoicemailIcon /> },
		{ number: "2", letter: "ABC" },
		{ number: "3", letter: "DEF" },
		{ number: "4", letter: "GHI" },
		{ number: "5", letter: "JKL" },
		{ number: "6", letter: "MNO" },
		{ number: "7", letter: "PQRS" },
		{ number: "8", letter: "TUV" },
		{ number: "9", letter: "WXYZ" },
		{ number: "*", letter: "" },
		{ number: "0", letter: "+" },
		{ number: "#", letter: "" },
	];

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<KeypressIcon />
						<span>Key Press</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>

				<div className={styles.keypad}>
					{keyArray?.map((item) => (
						<span className={styles.key}>
							<span className={styles.number}>{item.number}</span>
							<span className={styles.letter}>{item.letter}</span>
						</span>
					))}
				</div>

				<div className={styles.btnBox}>
					<button>Add Action</button>
				</div>
			</div>
		</>
	);
};

export default KeypressDialogue;

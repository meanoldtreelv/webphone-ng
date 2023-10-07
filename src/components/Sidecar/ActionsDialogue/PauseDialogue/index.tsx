import React from "react";
import styles from "./PauseDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";

const PauseDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<PauseIcon />
						<span>Pause</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>
				<div className={styles.inputBox}>
					<label htmlFor="">Seconds</label>
					<input type="text" placeholder="Seconds" />
				</div>

				<div className={styles.btnBox}>
					<button>Add Action</button>
				</div>
			</div>
		</>
	);
};

export default PauseDialogue;

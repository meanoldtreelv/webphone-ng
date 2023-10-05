import React from "react";
import styles from "./DialDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import DialIcon from "components/UI/Icons/Sidecar/Dial";
import ContactBookIcon from "components/UI/Icons/ContactBook";

const DialDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<DialIcon />
						<span>Dial</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>
				<div className={styles.inputBox}>
					<label htmlFor="">Number</label>
					<input type="text" placeholder="" />
					<span className={styles.contactIcon}>
						<ContactBookIcon />
					</span>
				</div>

				<div className={styles.btnBox}>
					<button>Add Action</button>
				</div>
			</div>
		</>
	);
};

export default DialDialogue;

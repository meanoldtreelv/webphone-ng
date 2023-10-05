import React from "react";
import styles from "./TransferDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import ContactBookIcon from "components/UI/Icons/ContactBook";

const TransferDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<TransferIcon />
						<span>Transfer</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>

				<div className={styles.transferBox}>
					<div>
						<input type="radio" name="call" id="transfer_call" />
						<label htmlFor="transfer_call">Transfer call</label>
					</div>
					<div>
						<input type="radio" name="call" id="attended_transfer_call" />
						<label htmlFor="attended_transfer_call">Attended Transfer call</label>
					</div>
				</div>

				<div className={styles.row}>
					<label htmlFor="">Number</label>
					<input type="text" />
					<span>
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

export default TransferDialogue;

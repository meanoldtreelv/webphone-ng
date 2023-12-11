import styles from "./SettingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import MessageIcon from "components/UI/Icons/Sidecar/Message";
import CloseIcon from "components/UI/Icons/Close";

const SettingDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<MessageIcon />
						<span>Choose your number</span>
					</span>

					<span className={styles.close}>
						<CloseIcon />
					</span>
				</h1>

				<p>Choose main number for sending messages</p>

				<div className={styles.row}>
					<label htmlFor="">Your Numbers </label>
					<select name="" id="">
						<option value="123456499">123456499</option>
					</select>
				</div>

				<div className={styles.btnBox}>
					<button>Set</button>
				</div>
			</div>
		</>
	);
};

export default SettingDialogue;

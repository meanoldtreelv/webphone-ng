import InfoIcon from "components/UI/Icons/Info";
import styles from "./DeleteVoicemail.module.scss";

const DeleteVoicemail = () => {
	return (
		<div className={styles.overlay}>
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={styles.delete_head}>Delete Voicemails?</div>
					<div className={styles.delete_ques}>Are you sure that you want to delete selected voicemails?</div>
				</div>

				<div className={styles.delete_btnCont}>
					<div className={styles.delete_cancelBtn}>
						<span className={``}>Cancel</span>
					</div>
					<div className={styles.delete_deleteBtn}>
						<span className={``}>Delete</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteVoicemail;

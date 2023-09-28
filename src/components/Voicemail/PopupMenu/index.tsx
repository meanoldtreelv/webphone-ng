import ChatIcon from "components/UI/Icons/Voicemail/Chat";
import styles from "./PopupMenu.module.scss";
import TrashIcon from "components/UI/Icons/Voicemail/Trash";
import LinkIcon from "components/UI/Icons/Voicemail/Link";
import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import EnvelopIcon from "components/UI/Icons/Voicemail/Envelop";

const PopupMenu = () => {
	return (
		<div className={styles.popup}>
			<button className={styles.popup_row}>
				<ChatIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_sendMsg}`}>Send Message</p>
			</button>

			<button className={styles.popup_row}>
				<TrashIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_delete}`}>Delete</p>
			</button>

			<button className={styles.popup_row}>
				<p className={`${styles.popup_share} ${styles.popup_rowText}`}>Share</p>
			</button>

			<button className={styles.popup_row}>
				<LinkIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_copy}`}>Copy Link</p>
			</button>

			<div className={styles.popup_row}>
				<CopyIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_copyText}`}>Copy Text</p>
			</div>

			<div className={styles.popup_row}>
				<EnvelopIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_email}`}>Share via Email</p>
			</div>
		</div>
	);
};

export default PopupMenu;

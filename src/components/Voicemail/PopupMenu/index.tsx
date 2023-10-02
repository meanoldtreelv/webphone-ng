import ChatIcon from "components/UI/Icons/Voicemail/Chat";
import styles from "./PopupMenu.module.scss";
import TrashIcon from "components/UI/Icons/Voicemail/Trash";
import LinkIcon from "components/UI/Icons/Voicemail/Link";
import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import EnvelopIcon from "components/UI/Icons/Voicemail/Envelop";
import ShareIcon from "components/UI/Icons/Voicemail/Share";

interface IPopupMenu {
	id: string,
	children: {
		icon: React.ReactNode;
		title: string;
		clicked?: () => void;
	}[];
}

const PopupMenu: React.FC<IPopupMenu> = ({ children, id }) => {
	return (
		<div className={styles.popup}>
			{/* <button className={styles.popup_row}>
				<ChatIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_sendMsg}`}>Send Message</p>
			</button>
			<button className={styles.popup_row}>
				<TrashIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_delete}`}>Delete</p>
			</button>
			<button className={styles.popup_row}>
				<ShareIcon />
				<p className={`${styles.popup_share} ${styles.popup_rowText}`}>Share</p>
			</button>
			<button className={styles.popup_row}>
				<LinkIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_copy}`}>Copy Link</p>
			</button>

			<button className={styles.popup_row}>
				<CopyIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_copyText}`}>Copy Text</p>
			</button>

			<button className={styles.popup_row}>
				<EnvelopIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_email}`}>Share via Email</p>
			</button> */}

			{children.map((opt) => (
				<button className={styles.popup_row} onClick={opt.clicked}>
					{opt.icon}
					<p className={`${styles.popup_rowText} ${styles.popup_email}`}>{opt.title}</p>
				</button>
			))}
		</div>
	);
};

export default PopupMenu;

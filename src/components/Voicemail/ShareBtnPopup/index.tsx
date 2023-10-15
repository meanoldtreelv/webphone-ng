import LinkIcon from "components/UI/Icons/Voicemail/Link";
import styles from "./ShareBtnPopup.module.scss";
import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import EnvelopIcon from "components/UI/Icons/Voicemail/Envelop";
import React from "react";

interface IShareBtnPopup {
	copyLink: () => void;
	copyText: () => void;
	mail: () => void;
}

const ShareBtnPopup: React.FC<IShareBtnPopup> = ({
	copyLink,
	copyText,
	mail
}) => {
	return (
		<div className={styles.popup}>
			<button className={styles.popup_row} onClick={copyLink}>
				<LinkIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_copy}`}>Copy Link</p>
			</button>

			<button className={styles.popup_row} onClick={copyText}>
				<CopyIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_copyText}`}>Copy Text</p>
			</button>

			<button className={styles.popup_row} onClick={mail}>
				<EnvelopIcon />
				<p className={`${styles.popup_rowText} ${styles.popup_email}`}>Share via Email</p>
			</button>
		</div>
	);
};

export default ShareBtnPopup;

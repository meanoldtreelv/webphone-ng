import { useState } from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";

const ConversationsFooter = () => {
	const [sendActive, setSendActive] = useState(true);

	return (
		<div className={styles.footer}>
			<span onClick={() => {}} className={styles.attachment}>
				<AttachmentIcon />
			</span>
			<div className={styles.inputBox}>
				<input placeholder="Enter your message" />
				<span className={styles.icon}>
					<MicrophoneIcon />
				</span>
			</div>
			<div className={`${styles.send} ${sendActive ? styles.send_active : ""}`}>
				<AirplaneIcon />
			</div>
		</div>
	);
};

export default ConversationsFooter;

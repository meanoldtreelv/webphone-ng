import React from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import Input from "components/UI/Forms/Input";
// import MicrophoneIcon from "components/UI/Icons/Microphone";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";

const ConversationsFooter = () => {
	return (
		<div className={styles.footer}>
			<span>
				<AttachmentIcon />
			</span>
			<div className={styles.inputBox}>
				<input placeholder="Enter your message" />
				<span className={styles.icon}>
					<MicrophoneIcon />
				</span>
			</div>
			<div className={styles.send}>
				<AirplaneIcon />
			</div>
		</div>
	);
};

export default ConversationsFooter;

import React from "react";
import styles from "./SendMessage.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
import HangupIcon from "components/UI/Icons/Sidecar/Hangup";
import MessageIcon from "components/UI/Icons/Sidecar/Message";

const SendMessageActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<MessageIcon />
				<span>Send Message</span>
			</p>
			<p>
				<span className={styles.extension}> 123456</span>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default SendMessageActionCard;

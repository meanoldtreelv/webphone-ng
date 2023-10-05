import React from "react";
import styles from "./Hangup.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
import HangupIcon from "components/UI/Icons/Sidecar/Hangup";

const HangupActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<HangupIcon />
				<span>Hangup</span>
			</p>
			<p>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default HangupActionCard;

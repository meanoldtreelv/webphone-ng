import React from "react";
import styles from "./Hold.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
import HangupIcon from "components/UI/Icons/Sidecar/Hangup";
import HolidayIcon from "components/UI/Icons/Status/Holiday";
import HoldIcon from "components/UI/Icons/Sidecar/Hold";

const HoldActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<HoldIcon />
				<span>Hold</span>
			</p>
			<p>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default HoldActionCard;

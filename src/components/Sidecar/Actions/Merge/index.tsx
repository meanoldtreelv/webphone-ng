import React from "react";
import styles from "./Merge.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";

const MergeActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<ConferenceIcon />
				<span>Merge</span>
			</p>
			<p>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default MergeActionCard;

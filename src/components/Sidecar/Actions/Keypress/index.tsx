import React from "react";
import styles from "./Keypress.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
import KeypressIcon from "components/UI/Icons/Sidecar/Keypress";

const KeypressActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<KeypressIcon />
				<span>Key Press</span>
			</p>
			<p>
				<span className={styles.extension}> Numpad button {"3"}</span>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default KeypressActionCard;

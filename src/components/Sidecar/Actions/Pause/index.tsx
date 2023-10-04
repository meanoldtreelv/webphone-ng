import React from "react";
import styles from "./Pause.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";

const PauseActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<PauseIcon />
				<span>Pause</span>
			</p>
			<p>
				<span className={styles.extension}>30 sec.</span>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default PauseActionCard;

import React from "react";
import styles from "./Transfer.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";

const TransferActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<TransferIcon />
				<span>Transfer</span>
			</p>
			<p>
				<span className={styles.extension}>{"+91 9999999999"}</span>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default TransferActionCard;

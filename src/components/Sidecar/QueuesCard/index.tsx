import React from "react";
import styles from "./QueuesCard.module.scss";

const QueuesCard = () => {
	return (
		<div className={styles.card}>
			<span>Ring All</span>
			<span>0</span>
			<span>00:00:00</span>
			<span>0</span>
			<span>0</span>
		</div>
	);
};

export default QueuesCard;

import React from "react";
import styles from "./QueuesCard.module.scss";
import { toSecMinAndHr } from "helpers/formatDateTime";

const QueuesCard = ({ queuesData }) => {
	return (
		<div className={styles.card}>
			<span>{queuesData.name}</span>
			<span>{queuesData.calls}</span>
			<span>{toSecMinAndHr(queuesData.holdtime)}</span>
			<span>{queuesData.members.length}</span>
			<span>0</span>
		</div>
	);
};

export default QueuesCard;

import React from "react";
import styles from "./Queues.module.scss";
import QueuesCard from "../QueuesCard";

const Queues = () => {
	return (
		<div>
			<div className={styles.header}>
				<span className={`${true && styles.activeTab}`}>All Queues</span>
				<span>My Queues</span>
			</div>
			<div>
				<div className={styles.header2}>
					<span>Queues</span>
					<span>Calls</span>
					<span>Wait Time</span>
					<span>Agents</span>
					<span>Available</span>
				</div>
				<QueuesCard />
				<QueuesCard />
				<QueuesCard />
			</div>
		</div>
	);
};

export default Queues;

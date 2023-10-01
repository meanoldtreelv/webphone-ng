import React from "react";
import styles from "./ExtensionCard.module.scss";
import StatusBarIcon from "components/UI/Icons/Status/StatusBar";
import CalenderIcon from "components/UI/Icons/Status/Calender";

const ExtensionCard = () => {
	return (
		<div className={styles.card}>
			<div className={styles.innerCard}>
				<h1>
					<StatusBarIcon />

					<span>Bob Doe</span>
					<CalenderIcon />
				</h1>
				<p>906011</p>
			</div>
		</div>
	);
};

export default ExtensionCard;

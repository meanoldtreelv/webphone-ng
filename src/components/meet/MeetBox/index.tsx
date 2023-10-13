import React, { useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("timeline");

	return (
		<div className={styles.queues}>
			<div className={styles.header}>
				<span
					className={`${tabSelected === "timeline" && styles.activeTab}`}
					onClick={() => {
						setTabSelected("timeline");
					}}>
					Timeline
				</span>
				<span
					className={`${tabSelected === "calender" && styles.activeTab}`}
					onClick={() => {
						setTabSelected("calender");
					}}>
					Calender
				</span>
			</div>
		</div>
	);
};

export default MeetBox;

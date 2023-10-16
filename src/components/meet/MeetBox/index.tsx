import React, { useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetingCard from "../MeetingCard";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("timeline");

	return (
		<div className={styles.queues}>
			<div className={styles.headerBox}>
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
				<span>
					<SettingsIcon />
				</span>
			</div>
			<div className={styles.meetBox}>
				<div>17 OCTOBER, TUE</div>
				<MeetingCard />
			</div>
		</div>
	);
};

export default MeetBox;

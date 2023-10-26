import React, { useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetingCard from "../MeetingCard";
import Calendar from "components/UI/Calendar";
import { useDispatch } from "react-redux";
import { setSettingsDialogue } from "redux/meet/meetSlice";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("timeline");

	const dispatch = useDispatch();
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
						className={`${tabSelected === "calendar" && styles.activeTab}`}
						onClick={() => {
							setTabSelected("calendar");
						}}>
						Calender
					</span>
				</div>
				<span
					onClick={() => {
						dispatch(setSettingsDialogue(true));
					}}>
					<SettingsIcon />
				</span>
			</div>
			{tabSelected === "timeline" && (
				<div>
					<div className={styles.meetBox}>
						<div>17 OCTOBER, TUE</div>
						<MeetingCard />
					</div>
				</div>
			)}

			{tabSelected === "calendar" && (
				<div className={styles.calendar}>
					<Calendar />
				</div>
			)}
		</div>
	);
};

export default MeetBox;

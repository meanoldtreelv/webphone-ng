import Select from "components/UI/Forms/Select";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import ChevronRightIcon from "components/UI/Icons/Profile/ChevronRight";
import React, { useState } from "react";
import styles from "./MeetHeader.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";

const MeetHeader = () => {
	const [selectedTab, setSelectedTab] = useState("");
	return (
		<div className={styles.meet}>
			<div className={styles.dateBox}>
				<div className={styles.rangeBox}>
					<span>
						<ChevronLeftIcon />
					</span>

					<input
						type="date"
						name="begin"
						placeholder="dd-mm-yyyy"
						value=""
						min="1997-01-01"
						max="2030-12-31"
						className={styles.date}
					/>
					<span>
						<ChevronRightIcon />
					</span>
				</div>
				<span className={styles.today}>Today</span>

				<div>
					{/* icon, options, onChange = undefined, defaultValue, */}
					<Select options={["Day", "Week", "Month", "Year"]} />
				</div>
			</div>
			{/* <div className={styles.rightBox}>
				<div className={styles.tabBox}>
					<span
						className={`${selectedTab === "schedule" ? styles.activeTab : ""}`}
						onClick={() => {
							setSelectedTab("schedule");
						}}>
						General
					</span>
					<span
						className={`${selectedTab === "join" && styles.activeTab}`}
						onClick={() => {
							setSelectedTab("join");
						}}>
						Extension
					</span>
					<span
						className={`${selectedTab === "start_meeting" && styles.activeTab}`}
						onClick={() => {
							setSelectedTab("start_meeting");
						}}>
						Queues
					</span>
				</div>
			</div> */}
		</div>
	);
};

export default MeetHeader;

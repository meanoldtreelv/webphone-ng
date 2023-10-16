import React, { useState } from "react";
import styles from "./Header.module.scss";
import ProfileAndExtension from "components/shared/ProfileAndExtension";

const Header = () => {
	const [selectedTab, setSelectedTab] = useState("");
	return (
		<div className={styles.header}>
			<h1>Meet</h1>

			<div className={styles.searchComp}>
				{/* <div className={styles.tabBox}>
					<span
						className={`${selectedTab === "schedule" ? styles.activeTab : ""}`}
						onClick={() => {
							setSelectedTab("schedule");
						}}>
						Schedule
					</span>
					<span
						className={`${selectedTab === "join" && styles.activeTab}`}
						onClick={() => {
							setSelectedTab("join");
						}}>
						Join
					</span>
					<span
						className={`${selectedTab === "start_meeting" && styles.activeTab}`}
						onClick={() => {
							setSelectedTab("start_meeting");
						}}>
						Start Meeting
					</span>
				</div> */}
			</div>

			<div className={styles.profile}>
				<ProfileAndExtension />
			</div>
		</div>
	);
};

export default Header;

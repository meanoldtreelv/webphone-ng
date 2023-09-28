import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSettingTab } from "redux/setting/settingSlice";
import { selectedTab } from "redux/setting/settingSelectors";

const Header = () => {
	const dispatch = useDispatch();
	const tabSelected = useSelector(selectedTab);

	return (
		<div className={styles.header}>
			<div className={`sub_headline_bold ${styles.heading}`}>Settings</div>
			<div className={`body ${styles.tabBox}`}>
				<span
					className={`${tabSelected === "sip_account" ? styles.activeTab : ""}`}
					onClick={() => {
						dispatch(setSettingTab("sip_account"));
					}}>
					SIP Account
				</span>
				<span
					className={`${tabSelected === "audio" ? styles.activeTab : ""}`}
					onClick={() => {
						dispatch(setSettingTab("audio"));
					}}>
					Audio
				</span>
				<span
					className={`${tabSelected === "video" ? styles.activeTab : ""}`}
					onClick={() => {
						dispatch(setSettingTab("video"));
					}}>
					Video
				</span>
				<span
					className={`${tabSelected === "ui" ? styles.activeTab : ""}`}
					onClick={() => {
						dispatch(setSettingTab("ui"));
					}}>
					User Interface
				</span>
				<span
					className={`${tabSelected === "advance" ? styles.activeTab : ""}`}
					onClick={() => {
						dispatch(setSettingTab("advance"));
					}}>
					Advance
				</span>
			</div>
		</div>
	);
};

export default Header;

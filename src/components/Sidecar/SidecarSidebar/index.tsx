import React from "react";
import styles from "./SidecarSidebar.module.scss";
import Backdrop from "components/UI/Backdrop";
import SettingsIcon from "components/Voicemail/Settings";
import DetachUndock from "components/UI/Icons/DetachUndock";
import NoActions from "../NoActions";
import Extension from "../Extension";
import Queues from "../Queues";
import { useDispatch, useSelector } from "react-redux";
import { tabSelected } from "redux/sidecar/sidecarSelectors";
import { setTabSelected } from "redux/sidecar/sidecarSlice";

const SidecarSidebar = () => {
	const selectedTab = useSelector(tabSelected);
	const dispatch = useDispatch();
	return (
		<>
			{/* <div className={styles.backdrop}></div> */}
			<Backdrop />
			<div className={styles.sidecarBar}>
				<div className={styles.topSection}>
					<h1>
						<span>Sidecar</span>
						<span>
							<SettingsIcon />

							<DetachUndock />
						</span>
					</h1>
					<div className={styles.tabBox}>
						<span
							className={`${selectedTab === "general" ? styles.activeTab : ""}`}
							onClick={() => {
								dispatch(setTabSelected("general"));
							}}>
							General
						</span>
						<span
							className={`${selectedTab === "extension" && styles.activeTab}`}
							onClick={() => {
								dispatch(setTabSelected("extension"));
							}}>
							Extension
						</span>
						<span
							className={`${selectedTab === "queues" && styles.activeTab}`}
							onClick={() => {
								dispatch(setTabSelected("queues"));
							}}>
							Queues
						</span>
					</div>
				</div>
				<div className={styles.btmSection}>
					{selectedTab === "general" ? <NoActions /> : <></>}
					{selectedTab === "extension" && <Extension />}
					{selectedTab === "queues" && <Queues />}
				</div>
			</div>
		</>
	);
};

export default SidecarSidebar;

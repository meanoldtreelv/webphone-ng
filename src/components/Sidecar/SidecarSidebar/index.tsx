import React from "react";
import styles from "./SidecarSidebar.module.scss";
import Backdrop from "components/UI/Backdrop";
import SettingsIcon from "components/Voicemail/Settings";
import DetachUndock from "components/UI/Icons/DetachUndock";
import NoActions from "../NoActions";
import Extension from "../Extension";
import Queues from "../Queues";

const SidecarSidebar = () => {
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
						<span className={`${true && styles.activeTab}`}>General</span>
						<span className={`${false && styles.activeTab}`}>Extension</span>
						<span className={`${false && styles.activeTab}`}>Queues</span>
					</div>
				</div>
				<div className={styles.btmSection}>
					{/* {true ? <NoActions /> : <></>} */}
					{/* <Extension /> */}
					<Queues />
				</div>
			</div>
		</>
	);
};

export default SidecarSidebar;

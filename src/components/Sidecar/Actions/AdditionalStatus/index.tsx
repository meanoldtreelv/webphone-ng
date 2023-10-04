import React from "react";
import styles from "./AdditionalStatus.module.scss";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import DeleteIcon from "components/UI/Icons/Delete";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
import KeypressIcon from "components/UI/Icons/Sidecar/Keypress";
import StatusIcon from "components/UI/Icons/Sidecar/Status";
import AvailableIcon from "components/UI/Icons/Status/Available";
import DNDIcon from "components/UI/Icons/Status/DND";
import DNDThisDeviceIcon from "components/UI/Icons/Status/DNDThisDevice";
import AwayIcon from "components/UI/Icons/Status/Away";
import ArrowRight from "components/UI/Icons/ArrowRight";
import ReloadIcon from "components/UI/Icons/ReloadIcon";
import OnCallIcon from "components/UI/Icons/Status/OnCall";
import MessageIcon from "components/UI/Icons/Sidecar/Message";
import CalenderIcon from "components/UI/Icons/Status/Calender";
import AFKIcon from "components/UI/Icons/Status/AFK";

const AdditionalStatusActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<StatusIcon />
				<span>Main Status</span>
			</p>
			<p>
				<span className={styles.extension}>
					<span className={styles.status}>
						<span>
							<OnCallIcon />
						</span>

						<span>
							<AFKIcon />
						</span>
					</span>
					<span>
						{/* <ArrowRight /> */}
						<ReloadIcon />
					</span>
					<span className={styles.status}>
						<span>
							<CalenderIcon />
						</span>
					</span>
				</span>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default AdditionalStatusActionCard;

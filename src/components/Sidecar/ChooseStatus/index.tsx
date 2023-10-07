import UserStatusIcon from "components/UI/Icons/UserStatus";
import React from "react";
import styles from "./ChooseStatus.module.scss";
import AvailableIcon from "components/UI/Icons/Status/Available";
import AwayIcon from "components/UI/Icons/Status/Away";
import DNDIcon from "components/UI/Icons/Status/DND";
import DNDThisDeviceIcon from "components/UI/Icons/Status/DNDThisDevice";

const ChooseStatus = () => {
	return (
		<div className={styles.statusBox}>
			<h1>Choose Status</h1>
			<div>
				<p>
					<span>
						<AvailableIcon />
					</span>
					<span>Available</span>
				</p>
				<p>
					<span>
						<AwayIcon />
					</span>
					<span>Away</span>
				</p>
				<p>
					<span>
						<DNDIcon />
					</span>
					<span>Do not Disturb</span>
				</p>
				<p>
					<span>
						<DNDThisDeviceIcon />
					</span>
					<span>
						Do not Disturb <b>(This device only)</b>
					</span>
				</p>
			</div>
		</div>
	);
};

export default ChooseStatus;

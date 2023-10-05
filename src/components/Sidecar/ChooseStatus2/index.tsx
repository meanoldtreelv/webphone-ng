import UserStatusIcon from "components/UI/Icons/UserStatus";
import React from "react";
import styles from "../ChooseStatus/ChooseStatus.module.scss";
import CalenderIcon from "components/UI/Icons/Status/Calender";
import OnCallIcon from "components/UI/Icons/Status/OnCall";
import OnLunchIcon from "components/UI/Icons/Status/OnLunch";
import HolidayIcon from "components/UI/Icons/Status/Holiday";
import AFKIcon from "components/UI/Icons/Status/AFK";

const ChooseStatus2 = () => {
	return (
		<div className={styles.statusBox}>
			<h1>Choose Status</h1>
			<div>
				<p>
					<span>
						<OnCallIcon />
					</span>
					<span>On a call</span>
				</p>
				<p>
					<span>
						<CalenderIcon />
					</span>
					<span>In a meeting</span>
				</p>
				<p>
					<span>
						<OnLunchIcon />
					</span>
					<span>Lunch</span>
				</p>
				<p>
					<span>
						<HolidayIcon />
					</span>
					<span>Holiday</span>
				</p>
				<p>
					<span>
						<AFKIcon />
					</span>
					<span>AFK</span>
				</p>
			</div>
		</div>
	);
};

export default ChooseStatus2;

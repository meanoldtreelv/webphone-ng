import React from "react";
import styles from "./SettingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import OnOffSwitch from "components/UI/OnOffSwitch";
import gsuite from "assets/images/img/calender.png";
import outlook from "assets/images/img/outlook.png";

const SettingDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Manage Calendar</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>

				<p>Manage your calendars integrations</p>

				<div className={styles.calendar}>
					<div className={styles.left}>
						<img src={gsuite} alt="" />
						<div>
							<span>GSuite Calendar</span>
							<span>You will be able to connect any of your G-Suite accounts</span>
						</div>
					</div>
					<div>
						<OnOffSwitch />
					</div>
				</div>

				<div className={styles.calendar}>
					<div className={styles.left}>
						<img src={outlook} alt="" />
						<div>
							<span>Outlook Calendar</span>
							<span>Or connect any of your Office 365 accounts</span>
						</div>
					</div>
					<div>
						<OnOffSwitch />
					</div>
				</div>

				<div className={styles.btnBox}>
					<button>Close</button>
				</div>
			</div>
		</>
	);
};

export default SettingDialogue;

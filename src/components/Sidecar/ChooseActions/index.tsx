import Backdrop from "components/UI/Backdrop";
import React from "react";
import styles from "./ChooseActions.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import DialIcon from "components/UI/Icons/Sidecar/Dial";
import PauseIcon from "components/UI/Icons/Sidecar/Pause";
import TransferIcon from "components/UI/Icons/Sidecar/Transfer";
import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
import MergeIcon from "components/UI/Icons/Sidecar/Merge";
import KeypressIcon from "components/UI/Icons/Sidecar/Keypress";
import HoldIcon from "components/UI/Icons/Sidecar/Hold";
import MessageIcon from "components/UI/Icons/Sidecar/Message";
import StatusIcon from "components/UI/Icons/Sidecar/Status";
import Status2Icon from "components/UI/Icons/Sidecar/Status2";

const actionArray = [
	{ name: "Dial", icon: <DialIcon /> },
	{ name: "Pause", icon: <PauseIcon /> },
	{ name: "Transfer", icon: <TransferIcon /> },
	{ name: "Conference", icon: <ConferenceIcon /> },
	{ name: "Merge", icon: <MergeIcon /> },
	{ name: "Key Press", icon: <KeypressIcon /> },
	{ name: "Hold", icon: <HoldIcon /> },
	{ name: "Send Message", icon: <MessageIcon /> },
	{ name: "Main Status", icon: <StatusIcon /> },
	{ name: "Additional Status", icon: <Status2Icon /> },
];

const ChooseActions = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.chooseActions}>
				<h1 className={styles.topHeading}>
					<span>Choose Actions</span>
					<span>
						<CloseIcon />
					</span>
				</h1>
				<div className={styles.btmSection}>
					{actionArray?.map((item) => (
						<div key={item.name} className={styles.actionBox}>
							<span>{item.icon}</span>
							<span>{item.name}</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ChooseActions;

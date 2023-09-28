import { useState } from "react";
import styles from "./GroupCalHistoryCard.module.scss";
import UserGroupIcon from "./../../../components/UI/Icons/User/UserGroup";
import UserIcon from "./../../../components/UI/Icons/User/UserSingle";
import CallMissedIcon from "./../../../components/UI/Icons/Call/CallMissed";
import CallIncomingIcon from "./../../../components/UI/Icons/Call/CallIncoming";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";

const GroupCalHistoryCard = () => {
	const [callType, setCallType] = useState("missed");

	return (
		<div className={styles.historyCard}>
			<div className={styles.historyCard_left}>
				<div className={styles.historyCard_circle}>
					<UserGroupIcon />
				</div>
				<div className={styles.historyCard_info}>
					<p>Team Group</p>
					<div className={styles.cardMissedInfo}>
						<span className={styles.cardMissedInfo_icon}>
							{callType === "missed" ? (
								<CallMissedIcon />
							) : callType === "incoming" ? (
								<CallIncomingIcon />
							) : (
								<CallOutgoingIcon />
							)}
						</span>
						<div
							className={styles.cardMissedInfo_count}
							style={
								callType === "missed"
									? { border: "#EE3939" }
									: { border: "#E3EAF2" }
							}>
							<span className={styles.user_icon}>
								<UserIcon />
							</span>

							<span
								style={
									callType === "missed"
										? { color: "#EE3939" }
										: { color: "#5C6168" }
								}>
								7
							</span>
						</div>
						<span
							className={styles.cardMissedInfo_time}
							style={
								callType === "missed"
									? { color: "#EE3939" }
									: { color: "#5C6168" }
							}>
							08m 55 sec
						</span>
					</div>
				</div>
			</div>
			<div className={styles.historyCard_right}>
				<p>7:54 PM</p>
				{/* <p
					className={`caption_1`}
					style={
						callType === "missed"
							? { color: "var(--text-danger, #EE3939)", textAlign: "right" }
							: { color: "var(--text-secondary, #5C6168)", textAlign: "right" }
					}>
					6m 19sec
				</p> */}
			</div>
		</div>
	);
};

export default GroupCalHistoryCard;

import { useState } from "react";
import styles from "./HistoryCard.module.scss";
import CallMissedIcon from "./../../../components/UI/Icons/Call/CallMissed";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";

const HistoryCard = () => {
	const [callType, setCallType] = useState("");
	return (
		<div className={styles.historyCard}>
			<div>
				<p className={styles.cardTitle} style={callType === "missed" ? { color: "#EE3939" } : { color: "#1F2023" }}>
					Inbound Call
				</p>
				<p className={styles.cardInfo}>
					<span>{callType === "missed" ? <CallMissedIcon /> : <CallOutgoingIcon />}</span>
					<span
						className={styles.cardContactNumber}
						style={
							callType === "missed"
								? { color: "#EE3939" }
								: { color: "#5C6168" }
						}>
						+1(634) 129 5527
					</span>
				</p>
			</div>
			<div>
				<p className={styles.cardCallTime}>
					7:54PM
				</p>
				<p
					className={styles.cardCallDuration}
					style={
						callType === "missed"
							? { color: "#EE3939", textAlign: "right" }
							: { color: "#5C6168", textAlign: "right" }
					}>
					6m 19sec
				</p>
			</div>
		</div>
	);
};

export default HistoryCard;

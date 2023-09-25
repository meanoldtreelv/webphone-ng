import { useState } from "react";
import styles from "./RecentHistoryCard.module.scss";
import CallMissedIcon from "./../../../components/UI/Icons/Call/CallMissed";
import CallIncomingIcon from "./../../../components/UI/Icons/Call/CallIncoming";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";

const RecentHistoryCard = () => {
	const [callType, setCallType] = useState("");
	return (
		<div className={styles.historyCard}>
			<div className={styles.cardLeft}>
				<div className={styles.cardLeft_circle}>
					<span>IC</span>
				</div>
				<div className={styles.cardLeft_right}>
					<p style={callType === "missed" ? { color: "#EE3939" } : { color: "#1F2023" }}>
						Inbound Call
					</p>
					<p>
						<span>
							{callType === "missed" ? (
								<CallMissedIcon />
							) : callType === "incoming" ? (
								<CallIncomingIcon />
							) : (
								<CallOutgoingIcon />
							)}
						</span>
						<span
							className={`caption_1`}
							style={
								callType === "missed"
									? { color: "var(--text-danger, #EE3939)" }
									: { color: "var(--text-secondary, #5C6168)" }
							}>
							+1(634) 129 5527
						</span>
					</p>
				</div>
			</div>
			<div>
				<p className={`caption_1`} style={{ color: "var(--text-tertiary, #9298A0)", textAlign: "right" }}>
					7:54PM
				</p>
				<p
					className={`caption_1`}
					style={
						callType === "missed"
							? { color: "var(--text-danger, #EE3939)", textAlign: "right" }
							: { color: "var(--text-secondary, #5C6168)", textAlign: "right" }
					}>
					6m 19sec
				</p>
			</div>
		</div>
	);
};

export default RecentHistoryCard;

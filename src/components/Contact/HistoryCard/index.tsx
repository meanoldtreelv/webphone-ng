import { useState } from "react";
import styles from "./HistoryCard.module.scss";
import CallMissedIcon from "./../../../components/UI/Icons/Call/CallMissed";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";

const HistoryCard = () => {
	const [callType, setCallType] = useState("");
	return (
		<div className={styles.historyCard}>
			<div>
				<p
					className={`body`}
					style={
						callType === "missed" ? { color: "var(--text-danger, #EE3939)" } : { color: "var(--text-primary, #1F2023)" }
					}>
					Inbound Call
				</p>
				<p className={`flex gap-1 items-center`}>
					<span>
						{callType === "missed" ? (
							<CallMissedIcon />
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

export default HistoryCard;

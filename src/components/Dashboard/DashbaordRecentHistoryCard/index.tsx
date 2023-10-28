import React, { useState } from "react";
import styles from "./DashboardRecentHistoryCard.module.scss";
import ContactProfile from "components/UI/ContactProfile";
import CallMissedIcon from "../../UI/Icons/Call/CallMissed";
import CallIncomingIcon from "../../UI/Icons/Call/CallIncoming";
import CallOutgoingIcon from "../../UI/Icons/Call/CallOutgoing";
import { formatDate, toSecMinAndHr } from "helpers/formatDateTime";
import { CallHistoryCDR } from "redux/call-history/callHistoryTypes";
import { useDispatch } from "react-redux";
import { setSelectedCallHistory } from "redux/call-history/callHistorySlice";

interface IDashboardRecentHistoryCard {
	details: CallHistoryCDR;
}

const DashboardRecentHistoryCard: React.FC<IDashboardRecentHistoryCard> = ({ details }) => {
	const dispatch = useDispatch();
	const [callType, setCallType] = useState("incoming");

	const handleSelectCallHistoryDetails = () => {
		dispatch(setSelectedCallHistory(details));
	};

	return (
		<button className={styles.historyCard} onClick={handleSelectCallHistoryDetails}>
			<div className={styles.cardLeft}>
				<div className={styles.cardLeft_circle}>
					<ContactProfile abbreviation={details?.cdr?.dst.slice(0, 2)} />
				</div>
				<div className={styles.cardLeft_right}>
					<p>{details?.cdr?.dst}</p>
					<p>
						{/* <span>
							{callType === "missed" ? (
								<CallMissedIcon />
							) : callType === "incoming" ? (
								<CallIncomingIcon />
							) : (
								<CallOutgoingIcon />
							)}
						</span> */}
						<span
							className={`caption_1`}
							style={
								callType === "missed"
									? { color: "var(--text-danger, #EE3939)" }
									: { color: "var(--text-secondary, #5C6168)" }
							}>
							Inbound Call
						</span>
					</p>
				</div>
			</div>
			<div className={styles.cardRight}>
				<p>{formatDate(details?.cdr?.starttime)}</p>
				<p
				// style={
				// 	callType === "missed"
				// 		? { color: "var(--text-danger, #EE3939)", textAlign: "right" }
				// 		: { color: "var(--text-secondary, #5C6168)", textAlign: "right" }
				// }
				>
					{toSecMinAndHr(details?.cdr?.billsec)}
				</p>
			</div>
		</button>
	);
};

export default DashboardRecentHistoryCard;

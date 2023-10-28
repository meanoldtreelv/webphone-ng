import React, { useState } from "react";
import styles from "./RecentHistoryCard.module.scss";
import ContactProfile from "components/UI/ContactProfile";
import CallMissedIcon from "./../../../components/UI/Icons/Call/CallMissed";
import CallIncomingIcon from "./../../../components/UI/Icons/Call/CallIncoming";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";
import { formatDate, toSecMinAndHr } from "helpers/formatDateTime";
import { CallHistoryCDR } from "redux/call-history/callHistoryTypes";
import { useDispatch } from "react-redux";
import { setSelectedCallHistory } from "redux/call-history/callHistorySlice";
import { setCallNumber } from "redux/call/callSlice";
import sip from "lib/sip";

interface IRecentHistoryCard {
	details: CallHistoryCDR;
}

const RecentHistoryCard: React.FC<IRecentHistoryCard> = ({ details }) => {
	const dispatch = useDispatch();
	const [callType, setCallType] = useState("incoming");

	const handleSelectCallHistoryDetails = () => {
		dispatch(setSelectedCallHistory(details));
		dispatch(setCallNumber(details?.cdr?.dst));
		sip.call(details?.cdr?.dst);
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

export default RecentHistoryCard;

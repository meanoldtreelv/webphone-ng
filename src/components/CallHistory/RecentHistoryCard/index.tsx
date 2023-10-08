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

interface IRecentHistoryCard {
	details: CallHistoryCDR;
}

const RecentHistoryCard: React.FC<IRecentHistoryCard> = ({details}) => {
	const dispatch = useDispatch();
	const [callType, setCallType] = useState("incoming");

	const handleSelectCallHistoryDetails = () => {
		dispatch(setSelectedCallHistory(details))
	}

	return (
		<button className={styles.historyCard} onClick={handleSelectCallHistoryDetails}>
			<div className={styles.cardLeft}>
				<div className={styles.cardLeft_circle}>
					{/* <span>IC</span> */}
					<ContactProfile abbreviation={"SG"} />
				</div>
				<div className={styles.cardLeft_right}>
					<p>Inbound Call</p>
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
							{/* +1(634) 129 5527 */}
							{details?.cdr?.starttime}
						</span>
					</p>
				</div>
			</div>
			<div className={styles.cardRight}>
				{/* <p>7:54PM</p> */}
				<p>{formatDate(details?.cdr?.dst)}</p>
				<p
				// style={
				// 	callType === "missed"
				// 		? { color: "var(--text-danger, #EE3939)", textAlign: "right" }
				// 		: { color: "var(--text-secondary, #5C6168)", textAlign: "right" }
				// }
				>
					{/* 6m 19sec */}
					{toSecMinAndHr(99)}
				</p>
			</div>
		</button>
	);
};

export default RecentHistoryCard;

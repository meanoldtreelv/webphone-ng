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
			<div className={`flex gap-x-[8px] items-center ${""}`}>
				<span
					className={`flex py-[9px] w-[38px] h-[38px] justify-center items-center ${styles.historyCard_circle}`}
					style={{ backgroundColor: "var(--accent-grey-secondary, #E3EAF2)" }}>
					<span>
						<UserGroupIcon />
					</span>
				</span>
				<div>
					<p
						className={`body`}
						style={{ color: "var(--text-primary, #1F2023)" }}>
						Team Group
					</p>
					<p className={`flex gap-2 items-center`}>
						<span className=" xl:pb-[2px] " >
							{callType === "missed" ? (
								<CallMissedIcon />
							) : callType === "incoming" ? (
								<CallIncomingIcon />
							) : (
								<CallOutgoingIcon />
							)}
						</span>
						<span
							className="flex items-center gap-x-[1px] justify-center rounded-[8px] px-[4px] py-[2px]"
							style={callType === "missed" ? {border: "1px solid var(--border-danger, #EE3939)"} : { border: "1px solid var(--border-tertiary, #E3EAF2)" }}>
							<span className={`h-[100%] xl:pb-[2px] ${styles.user_icon}`}>
								{/* don't forget to modify the css file for the component below  */}
								<UserIcon />
							</span>

							<span className="caption_2_bold " style={callType === "missed"
									? { color: "var(--text-danger, #EE3939)" }
									: { color: "var(--text-secondary, #5C6168)" }}>
								7
							</span>
						</span>
						<span
							className={`caption_1`}
							style={
								callType === "missed"
									? { color: "var(--text-danger, #EE3939)" }
									: { color: "var(--text-secondary, #5C6168)" }
							}>
							08m 55 sec
						</span>
					</p>
				</div>
			</div>
			<div>
				<p className={`caption_1`} style={{ color: "var(--text-tertiary, #9298A0)", textAlign: "right" }}>
					7:54 PM
				</p>
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

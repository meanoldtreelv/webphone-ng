import { useState } from "react";
import styles from "./GroupCard.module.scss";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import UserIcon from "components/UI/Icons/User/UserSingle";

const GroupCard = () => {
	const [callType, setCallType] = useState("");
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
					<p className={`flex gap-1 items-center`}>
						<span
							className="flex items-center justify-center rounded-[8px] px-[4px] py-[2px]"
							style={{ border: "1px solid var(--border-tertiary, #E3EAF2)" }}>
							<span className={`h-[100%] pb-[2px] ${styles.user_icon}`}>
								{/* this icon is just a gray just like the rest */}
								<UserIcon />
							</span>

							<span className="caption_2_bold " style={{color: "var(--text-secondary, #5C6168)"}}>7</span>
						</span>
						<span
							className={`caption_1`}
							style={
								{ color: "var(--text-secondary, #5C6168)" }
							}>
							Conference group for our team...
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default GroupCard;

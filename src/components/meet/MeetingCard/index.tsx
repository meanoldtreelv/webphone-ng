import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import React, { useState } from "react";
import styles from "./MeetingCard.module.scss";
import LinkIcon from "components/UI/Icons/Voicemail/Link";

const MeetingCard = () => {
	const [iconVisible, setIconVisible] = useState(false);
	return (
		<div
			className={styles.card}
			onMouseOver={() => {
				setIconVisible(true);
			}}
			onMouseOut={() => {
				setIconVisible(false);
			}}>
			<div className={styles.timeBox}>
				<div className={styles.statusIcon}></div>
				<span className={styles.time}>8:15 - 9:15</span>
				<span className={styles.meeting}>meeting</span>
			</div>

			<div className={styles.attendee}>
				<span className={styles.no_of_attendee}>1 Attendees </span>
				<span>(1 Yes)</span>
			</div>
			<div className={styles.iconBox}>
				{iconVisible && (
					<>
						<CopyIcon />
						<LinkIcon />
					</>
				)}
			</div>
		</div>
	);
};

export default MeetingCard;

import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import React, { useState } from "react";
import styles from "./MeetingCard.module.scss";
import LinkIcon from "components/UI/Icons/Voicemail/Link";
import { convertToHourMinuteFormat } from "helpers/formatDateTime";
import { useDispatch } from "react-redux";
import { setDescriptionDialogue, setJoinDialogue, setMeetingDetails } from "redux/meet/meetSlice";
// import { longDateTimeFormat } from "helpers/formatDateTime";

const MeetingCard = ({ meetData }) => {
	const [iconVisible, setIconVisible] = useState(false);

	const dispatch = useDispatch();

	// console.log(meetData);
	// // Example usage
	// const dateTimeString = "2023-10-26T04:15:00+00:00";
	// const hourMinuteFormat = convertToHourMinuteFormat(dateTimeString);
	// console.log(hourMinuteFormat); // Output: "04:15"
	const meetHandler = () => {
		dispatch(setMeetingDetails(meetData));
		dispatch(setDescriptionDialogue(true));
	};

	const currentDate = new Date();

	const targetDate = new Date(meetData.start);
	const acceptedData = meetData?.attendees?.filter((item) => item.status === "accepted");

	const joinHandler = () => {
		window.open(`https://meet.ringplan.com/auth/?id=${meetData?.jitsi_meeting_room_id}`, "_blank");

		dispatch(setJoinDialogue(false));
	};

	return (
		<div
			className={styles.card}
			onMouseOver={() => {
				setIconVisible(true);
			}}
			onMouseOut={() => {
				setIconVisible(false);
			}}>
			<div onClick={meetHandler} className={styles.leftDiv}>
				<div className={styles.timeBox}>
					<div
						className={styles.statusIcon}
						style={targetDate > currentDate ? { borderColor: "green" } : { borderColor: "grey" }}></div>
					<span className={styles.time}>
						{convertToHourMinuteFormat(meetData?.start)} - {convertToHourMinuteFormat(meetData?.end)}
					</span>
					<span className={styles.meeting}>{meetData?.title}</span>
				</div>

				<div className={styles.attendee}>
					<span className={styles.no_of_attendee}>{meetData?.attendees.length} Attendees </span>
					<span>({acceptedData.length} Yes)</span>
				</div>
			</div>

			<div className={styles.iconBox}>
				{iconVisible && (
					<>
						<CopyIcon />
						<span onClick={joinHandler}>
							<LinkIcon />
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default MeetingCard;

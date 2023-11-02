import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import { useState } from "react";
import styles from "./MeetingCard.module.scss";
import LinkIcon from "components/UI/Icons/Voicemail/Link";
import { convertToHourMinuteFormat } from "helpers/formatDateTime";
import { useDispatch } from "react-redux";
import {
	setDescriptionDialogue,
	setJoinDialogue,
	setMeetingDetails,
	setMeetingId,
	setRecordDialogue,
} from "redux/meet/meetSlice";

import VideoRecordIcon from "components/UI/Icons/meet/VideoRecord";
import ThreeDots from "components/UI/Icons/meet/ThreeDots";

const MeetingCard = ({ meetData }) => {
	const [iconVisible, setIconVisible] = useState(false);
	const [moreIcon, setMoreIcon] = useState(false);

	const dispatch = useDispatch();

	const currentDate = new Date();

	const targetDate = new Date(meetData.start);
	const acceptedData = meetData?.attendees?.filter((item) => item.status === "accepted");

	const meetHandler = () => {
		dispatch(setMeetingDetails(meetData));
		dispatch(setDescriptionDialogue(true));
	};

	const joinHandler = () => {
		window.open(`https://meet.ringplan.com/auth/?id=${meetData?.jitsi_meeting_room_id}`, "_blank");

		dispatch(setJoinDialogue(false));
	};

	const recordHandler = () => {
		dispatch(setRecordDialogue(true));
		dispatch(setMeetingId(meetData?.jitsi_meeting_room_id));
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
						{meetData?.jitsi_meeting_room?.meeting_video_data.length > 0 && (
							<span onClick={recordHandler}>
								<VideoRecordIcon />
							</span>
						)}
					</>
				)}
			</div>
			<span
				className={styles.threeDots}
				onClick={() => {
					setMoreIcon(!moreIcon);
				}}>
				<ThreeDots />
			</span>
			{moreIcon && (
				<div className={styles.moreIcon}>
					<CopyIcon />
					<span onClick={joinHandler}>
						<LinkIcon />
					</span>
					{meetData?.jitsi_meeting_room?.meeting_video_data.length > 0 && (
						<span onClick={recordHandler}>
							<VideoRecordIcon />
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default MeetingCard;

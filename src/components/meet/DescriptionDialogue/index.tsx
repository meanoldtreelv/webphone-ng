import Backdrop from "components/UI/Backdrop";
import React, { useState } from "react";
import styles from "./DescriptionDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import LockIcon from "components/UI/Icons/Lock";
import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteDialogue, setDescriptionDialogue, setEditDialogue, seteventId } from "redux/meet/meetSlice";
import { editDialogue, meetingDetails } from "redux/meet/meetSelectors";
import { convertDateFormat, convertToHourMinuteFormat } from "helpers/formatDateTime";

const DescriptionDialogue = () => {
	const dispatch = useDispatch();
	const details = useSelector(meetingDetails);
	// const [meetingCode, setMeetingCode] = useState("");

	const joinHandler = () => {
		window.open(`https://meet.ringplan.com/auth/?id=${details?.jitsi_meeting_room_id}`, "_blank");
		// if (+meetingCode <= 99999999) {
		// 	return;
		// } else {
		// 	// setMeetingCode("");
		// 	// dispatch(setJoinDialogue(false));
		// }
	};

	const deleteHandler = () => {
		dispatch(seteventId(details?.id));
		dispatch(setDeleteDialogue(true));
	};

	console.log(details, "details");

	const filteredAttendees = details?.attendees?.filter((item) => item.is_organizer === false);
	const filteredOrganizer = details?.attendees?.filter((item) => item.is_organizer === true);

	const editHandler = () => {
		dispatch(setDescriptionDialogue(false));
		dispatch(setEditDialogue(true));
	};

	const acceptedData = details?.attendees?.filter((item) => item.status === "accepted");

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						{details?.jitsi_meeting_room?.common_password ? <LockIcon /> : <></>}

						<span>{details?.title}</span>
					</span>

					<span
						onClick={() => {
							dispatch(setDescriptionDialogue(false));
						}}
						style={{ cursor: "pointer" }}>
						<CloseIcon />
					</span>
				</h1>
				<div className={styles.dateBox}>
					<div>
						<div className={styles.date}>
							{convertDateFormat(details?.start)} - {convertToHourMinuteFormat(details?.start)}-
							{convertToHourMinuteFormat(details?.end)}
						</div>
						<div className={styles.date}>Daily, until Oct 24, 2023</div>
					</div>
					<button className={styles.edit} onClick={editHandler}>
						Edit
					</button>
				</div>

				<label>Description</label>
				<div className={styles.date}>{details.description}</div>
				{details?.jitsi_meeting_room?.common_password ? (
					<>
						<label>Password</label>
						<div className={styles.password}>
							<span>{details.jitsi_meeting_room.common_password}</span>
							<></>
							<CopyIcon />
						</div>
					</>
				) : (
					<></>
				)}

				<div className={styles.date}>
					{details?.attendees?.length} Attendees,{" "}
					<span>
						{acceptedData.length} Yes, {details?.attendees?.length - acceptedData?.length} Awaiting
					</span>
				</div>
				<div className={styles.organizer}>
					<p>
						{filteredOrganizer?.[0]?.email} <span>(Organizer)</span>
					</p>
					<p className={styles.email}>{filteredOrganizer?.[0]?.first_name + " " + filteredOrganizer?.[0]?.last_name}</p>
				</div>
				{filteredAttendees?.map((item) => <div className={styles.attendee}>{item.email}</div>)}

				<div className={styles.btnBox}>
					<button className={styles.delete} onClick={deleteHandler}>
						Delete
					</button>
					<button onClick={joinHandler}>Join</button>
				</div>
			</div>
		</>
	);
};

export default DescriptionDialogue;

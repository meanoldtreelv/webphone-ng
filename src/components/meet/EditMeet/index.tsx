import React, { useState } from "react";
import styles from "./EditMeet.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import Select from "components/UI/Forms/Select";
import moment from "moment-timezone";

//timezone list import
import * as ct from "countries-and-timezones";

import { listTimeZones } from "timezone-support";
import { useLazyCreateMeetQuery, useLazyGetMeetQuery } from "services/meet";
import { createMeet } from "effects/apiEffect";
import { useDispatch, useSelector } from "react-redux";
import { setEditDialogue, setScheduleDialogue } from "redux/meet/meetSlice";
import { meetingDetails } from "redux/meet/meetSelectors";
moment.tz.names();
const timezones = ct.getAllTimezones();
console.log(timezones);

// import { listTimeZones } from "timezone-support";

// List canonical time zone names: [ 'Africa/Abidjan', ... ]
const timeZones2 = listTimeZones();
console.log(timeZones2);

const EditMeet = () => {
	const [isRepeat, setIsRepeat] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [selectedOption, setSelectedOption] = useState("never");

	const dispatch = useDispatch();
	const editData = useSelector(meetingDetails);
	console.log(editData, "editData");
	const convertToDateTime = (inputDateString) => {
		// Create a Date object from the input string
		const inputDate = new Date(inputDateString);

		// Extract the date and time components
		const year = inputDate.getFullYear();
		const month = String(inputDate.getMonth() + 1).padStart(2, "0");
		const day = String(inputDate.getDate()).padStart(2, "0");
		const hours = String(inputDate.getHours()).padStart(2, "0");
		const minutes = String(inputDate.getMinutes()).padStart(2, "0");

		// Create the output date string in the desired format
		const outputDateString = `${year}-${month}-${day}T${hours}:${minutes}`;
		return outputDateString;
	};

	const [title, setTitle] = useState<string | null>(editData?.title);
	const [description, setDescription] = useState(editData?.description);
	const [start, setStart] = useState(convertToDateTime(editData?.start));
	const [end, setEnd] = useState("");
	const [password, setPassword] = useState("");
	const [attendees, setAttendees] = useState<string | null>(null);
	const [attendeesList, setAttendeesList] = useState<{}[]>([]);
	const [frequency, setFrequency] = useState("DAILY");
	const [weekday, setWeekDay] = useState([]);
	const [byWeek, setByWeek] = useState("");
	const [count, setCount] = useState("1");
	const [interval, setInterval] = useState("1");
	const [timezone, setTimezone] = useState("");

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const addAttendeesHandler = () => {
		setAttendeesList([
			...attendeesList,
			{
				email: attendees,
			},
		]);
	};

	const dateTime = DateTime.fromISO(start, { zone: timezone });
	console.log(dateTime.toString());

	const data = {
		title: title,
		description: description,
		start: dateTime.toString(),
		end: end,
		password: password,
		attendees: attendeesList,
		// recurrence: {
		// 	frequency: frequency,
		// 	// by_week_day: [1, 5],
		// 	// by_week: 2,
		// 	count: +count,
		// 	interval: +interval,
		// },
	};

	// useLazyCreateMeetQuery(data);

	const handleSubmit = () => {
		createMeet(
			data,
			(res: any) => {
				console.log(res, "meet created ");
				if (res?.status === 200) {
					console.log("success in account retrieve");
				}
			},
			(err: any) => {
				console.error(err, "err in meet creation");
			},
		);
		// dispatch(setEditDialogue(false));
	};
	console.log(editData?.start, "test", start);

	// Input date string
	// const inputDateString = "2023-10-20T10:10:12+00:00";

	console.log(convertToDateTime(editData?.start)); // Output: "2023-10-20T10:10"

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Edit Scheduled Meet</span>
					</span>

					<span
						onClick={() => {
							dispatch(setEditDialogue(false));
						}}
						style={{ cursor: "pointer" }}>
						<CloseIcon />
					</span>
				</h1>
				<label htmlFor="">Title</label>

				<div className={styles.row}>
					<input
						type="text"
						placeholder="Enter title here..."
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
				<label>Description</label>
				<textarea
					name=""
					id=""
					rows="3"
					placeholder="Enter Description here..."
					className={styles.textarea}
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}></textarea>
				<label>Date & Time</label>
				<div className={styles.row}>
					{/* <label htmlFor="">Title</label> */}
					<input
						type="datetime-local"
						value={start}
						onChange={(e) => {
							setStart(e.target.value);
						}}
					/>
					{/* <span>
						<ContactBookIcon />
					</span> */}
				</div>
				<label>Time Zone</label>
				<div className={styles.row2}>
					<Select
						options={timezones?.map((x: any) => [{ name: x, value: x }]).map((y: any) => y[0])}
						value={timezone}
						onChange={(e) => {
							console.log(e.target.value);
							setTimezone(e.target.value);
						}}
					/>
				</div>
				<label htmlFor="">Attendees emails</label>
				<div className={styles.emailBox}>
					<input
						type="text"
						name=""
						id=""
						placeholder="Enter email here..."
						value={attendees}
						onChange={(e) => {
							setAttendees(e.target.value);
						}}
					/>
					<button onClick={addAttendeesHandler}>ADD</button>
				</div>

				<div>
					<label htmlFor="">Attendees added(1):</label>
					<div className={styles.attendees}>
						gshivam@startxlabs.in <span>(Organizer)</span>
					</div>
				</div>

				<div className={` ${styles.btnBox}`}>
					<button
						className={styles.cancel}
						onClick={() => {
							dispatch(setEditDialogue(false));
						}}>
						Close
					</button>
					<button className={styles.submit} onClick={handleSubmit}>
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export default EditMeet;

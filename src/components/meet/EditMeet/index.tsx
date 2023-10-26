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
import { useDispatch } from "react-redux";
import { setScheduleDialogue } from "redux/meet/meetSlice";
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

	const [title, setTitle] = useState<string | null>("");
	const [description, setDescription] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [password, setPassword] = useState("");
	const [attendees, setAttendees] = useState<string | null>(null);
	const [attendeesList, setAttendeesList] = useState<{}[]>([]);
	const [frequency, setFrequency] = useState("DAILY");
	const [weekday, setWeekDay] = useState([]);
	const [byWeek, setByWeek] = useState("");
	const [count, setCount] = useState("1");
	const [interval, setInterval] = useState("1");

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

	const data = {
		title: title,
		description: description,
		start: start,
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
		// dispatch(setScheduleDialogue(false));
	};
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
							dispatch(setScheduleDialogue(false));
						}}>
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
					<Select />
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
							dispatch(setScheduleDialogue(false));
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

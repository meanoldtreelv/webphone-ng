import { useEffect, useState } from "react";
import styles from "./ScheduleMeetingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import Select from "components/UI/Forms/Select";
import moment from "moment-timezone";
import { createMeet } from "effects/apiEffect";
import { useDispatch } from "react-redux";
import { setScheduleDialogue } from "redux/meet/meetSlice";
// import { DateTime } from "luxon";
// import { useLazyCreateMeetQuery, useLazyGetMeetQuery } from "services/meet";
const timezones = moment.tz.names();

const ScheduleMeetingDialogue = () => {
	const [isRepeat, setIsRepeat] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [selectedOption, setSelectedOption] = useState("never");

	const [list] = useState([
		{ value: "Daily", name: "Daily", selected: true },
		{ value: "Weekly on Thursday", name: "Weekly on Thursday", selected: false },
		{ value: "Monday to Friday", name: "Monday to Friday", selected: false },
		{ value: "Custom Range", name: "Custom", selected: false },
	]);

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
	const [timezone, setTimezone] = useState("");

	const [deleteEmail, setDeleteEmail] = useState("");

	const data = {
		title: title,
		description: description,
		start: start + ":00Z",
		end: end + ":00Z",
		attendees: attendeesList,
		// password: password,
		// recurrence: {
		// 	frequency: frequency,
		// by_week_day: [1, 5],
		// by_week: 2,
		// 	count: +count,
		// 	interval: +interval,
		// },
	};

	function appendPasswordToObject(dataObject, passwordValue) {
		dataObject.password = passwordValue;
	}

	if (isPrivate === true) {
		appendPasswordToObject(data, password);
	}

	if (isRepeat === true) {
		data.recurrence = {
			frequency: frequency,
			// by_week_day: [1, 5],
			// by_week: 2,
			count: +count,
			interval: +interval,
		};
	}

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
		setAttendees("");
	};

	const handleSubmit = () => {
		createMeet(
			data,
			(res: any) => {
				console.log(res, "meet created ");
				if (res?.status === 201) {
					console.log("success in account retrieve");
					dispatch(setScheduleDialogue(false));
				}
			},
			(err: any) => {
				console.error(err, "err in meet creation");
			},
		);
		// dispatch(setScheduleDialogue(false));
	};

	const removeHandler = (emailId) => {
		const list = attendeesList;
		for (let i = 0; i < list.length; i++) {
			if (list[i].email === emailId) {
				list.splice(i, 1);
				setAttendeesList([...list]);
				break; // Exit the loop after deleting the item
			}
		}
	};

	useEffect(() => {
		removeHandler(deleteEmail);
	}, [deleteEmail]);

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Schedule Meet</span>
					</span>

					<span
						onClick={() => {
							dispatch(setScheduleDialogue(false));
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
					<input
						type="datetime-local"
						value={end}
						onChange={(e) => {
							setEnd(e.target.value);
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
							// console.log(e.target.value);
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
					{attendeesList?.map((item) => (
						<p key={item.email}>
							{item.email}{" "}
							<span
								style={{ cursor: "pointer" }}
								onClick={() => {
									setDeleteEmail(item.email);
								}}
								id={item.email}>
								&#10006;
							</span>
						</p>
					))}
				</div>

				<div className={styles.checkboxGroup}>
					<div className={styles.box1}>
						<span>
							<input
								type="checkbox"
								name=""
								id=""
								onChange={() => {
									setIsRepeat(!isRepeat);
								}}
							/>
							<label htmlFor="">Repeat</label>
						</span>
						{isRepeat && (
							<span>
								<Select
									options={list.map((x: any) => [{ name: x["name"], value: x["value"] }]).map((y: any) => y[0])}
									value={frequency}
									onChange={(e) => {
										// console.log(e.target.value);
										setFrequency(e.target.value);
									}}
								/>
							</span>
						)}
					</div>
					{isRepeat && (
						<div className={styles.endBox}>
							<div>
								<label htmlFor="">Ends:</label>
								<div className={styles.ends}>
									<span>
										<input
											type="radio"
											name="ends"
											id=""
											value="never"
											checked={selectedOption === "never"}
											onChange={handleOptionChange}
										/>
										<label htmlFor="">Never</label>
									</span>
									<span>
										<input
											type="radio"
											name="ends"
											id=""
											value="after"
											checked={selectedOption === "after"}
											onChange={handleOptionChange}
										/>
										<label htmlFor="">After</label>
									</span>
									<span>
										<input
											type="radio"
											name="ends"
											id=""
											value="on_date"
											checked={selectedOption === "on_date"}
											onChange={handleOptionChange}
										/>
										<label htmlFor="">On Date</label>
									</span>
								</div>
							</div>
							{selectedOption === "after" && (
								<div className={styles.occurrence}>
									<input
										type="text"
										name=""
										id=""
										placeholder="1"
										value={count}
										onChange={(e) => {
											setCount(e.target.value);
										}}
									/>
									<label htmlFor="">occurrences</label>
								</div>
							)}
							{selectedOption === "on_date" && (
								<div className={styles.on_date}>
									<input
										type="date"
										name=""
										id=""
										value={end}
										onChange={(e) => {
											// setEnd(e.target.value);
										}}
									/>
								</div>
							)}
						</div>
					)}
				</div>

				<div className={styles.checkboxGroup}>
					<div className={styles.box1}>
						<span>
							<input
								type="checkbox"
								name=""
								id=""
								onChange={() => {
									setIsPrivate(!isPrivate);
								}}
							/>
							<label htmlFor="">Make it Private</label>
						</span>
					</div>
					{isPrivate && (
						<div>
							<label htmlFor="">Password</label>
							<div className={styles.row}>
								<input
									type="text"
									placeholder="Enter password here..."
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
						</div>
					)}
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
						Schedule
					</button>
				</div>
			</div>
		</>
	);
};

export default ScheduleMeetingDialogue;

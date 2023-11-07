import { useEffect, useState } from "react";
import styles from "./ScheduleMeetingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import Select from "components/UI/Forms/Select";
import moment from "moment-timezone";
import { useDispatch } from "react-redux";
import { setScheduleDialogue } from "redux/meet/meetSlice";
import { useLazyCreateMeetQuery } from "services/meet";
import { ClipLoader } from "react-spinners";
const timezones = moment.tz.names();

const ScheduleMeetingDialogue = () => {
	const [isRepeat, setIsRepeat] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [selectedOption, setSelectedOption] = useState("never");
	const [when, setWhen] = useState("");

	const [createMeet, { data: createMeetData, isLoading }] = useLazyCreateMeetQuery();

	const [list] = useState([
		{ value: "DAILY", name: "Daily", selected: true },
		{ value: "WeeklyonMonday", name: "Weekly on Monday", selected: false },
		{ value: "MondaytoFriday", name: "Monday to Friday", selected: false },
		{ value: "CustomRange", name: "Custom", selected: false },
	]);

	const repeatEveryList = [
		{ value: "Day", name: "Day", selected: true },
		{ value: "Week", name: "Week", selected: false },
		{ value: "Month", name: "Month", selected: false },
		{ value: "Year", name: "Year", selected: false },
	];

	const [byWeekdayList, setByWeekdayList] = useState([
		{ name: "Mo", value: "1", bool: true },
		{ name: "Tu", value: "2", bool: false },
		{ name: "We", value: "3", bool: false },
		{ name: "Th", value: "4", bool: false },
		{ name: "Fr", value: "5", bool: false },
		{ name: "Sa", value: "6", bool: false },
		{ name: "Su", value: "7", bool: false },
	]);

	const dispatch = useDispatch();

	const [title, setTitle] = useState<string | null>("");
	const [description, setDescription] = useState("");
	const [start, setStart] = useState(new Date().toISOString().slice(0, 16));
	const [end, setEnd] = useState("");
	const [password, setPassword] = useState("");
	const [attendees, setAttendees] = useState<string | null>(null);
	const [attendeesList, setAttendeesList] = useState<{}[]>([]);
	const [frequency, setFrequency] = useState("DAILY");
	const [byWeekday, setByWeekDay] = useState([]);
	const [byWeek, setByWeek] = useState("");
	const [count, setCount] = useState("1");
	const [interval, setInterval] = useState("1");
	const [timezone, setTimezone] = useState("Africa/Bissau");
	const [end2, setEnd2] = useState(null);
	const [newFrequency, setNewFrequency] = useState("DAILY");

	const [deleteEmail, setDeleteEmail] = useState("");

	const [recurrenceData, setRecurrenceData] = useState({ frequency: newFrequency, interval: +interval });

	const filteredDay = byWeekdayList.filter((item) => item.bool === true);
	console.log("====================================");
	console.log(filteredDay?.map(({ value }) => value));
	console.log("====================================");

	function convertDateToTimezoneDate(date, timeZone) {
		const inputDateTime = new Date(date);
		// const timeZone = "Africa/Bissau";

		// Output time zone
		const outputTimeZone = "UTC";

		// Convert the input date and time to the output time zone
		const inputDateTimeInUTC = new Date(inputDateTime.toLocaleString("en-US", { timeZone: timeZone }));

		// Format the converted date and time as "2023-11-06T19:52"
		const options = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZoneName: "short",
		};

		const formatter = new Intl.DateTimeFormat("en-US", options);

		let formattedDateTime = formatter.format(inputDateTimeInUTC);
		const newDate = new Date(formattedDateTime);

		return newDate.toISOString().slice(0, 16);
	}

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

	// function appendToObject(dataObject, keyss, value) {
	// 	dataObject.keyss = value;
	// }
	useEffect(() => {
		const originalDate = new Date(start);
		// todo - this should be corrected
		const newDate = new Date(originalDate.getTime() + 345 * 60 * 1000); // Add 15 minutes in milliseconds

		// console.log(newDate.toISOString().slice(0, 16)); // This will display the new date and time
		console.log(newDate);

		if (start) {
			console.log(start);
			console.log(newDate.toISOString().slice(0, 16));

			setEnd(newDate.toISOString().slice(0, 16));
		}
	}, [start]);

	if (isPrivate && password) {
		appendPasswordToObject(data, password);
	}

	// let recurrenceData = { frequency: newFrequency, interval: +interval };
	if (isRepeat === true) {
		// data.recurrence = {
		// 	frequency: newFrequency,
		// 	interval: +interval,
		// 	// by_week_day: [1, 5],
		// 	// by_week: 2,
		// 	count: +count,
		// 	end: end2,
		// };
		data.recurrence = recurrenceData;
		console.log("repeat");
	}

	// useEffect(() => {
	// 	if (frequency === "WeeklyonMonday") {
	// 		setNewFrequency("WEEKLY");
	// 		recurrenceData.by_week_day = ["1"];
	// 	}
	// 	if (frequency === "MondaytoFriday") {
	// 		setNewFrequency("WEEKLY");
	// 		recurrenceData.by_week_day = ["1", "2", "3", "4", "5"];
	// 	}
	// }, [frequency]);

	useEffect(() => {
		const updatedRecurrenceData = { ...recurrenceData }; // Create a copy
		if (frequency === "WeeklyonMonday") {
			setNewFrequency("WEEKLY");
			updatedRecurrenceData.frequency = "WEEKLY";
			updatedRecurrenceData.by_week_day = ["1"];
		}
		if (frequency === "MondaytoFriday") {
			setNewFrequency("WEEKLY");
			updatedRecurrenceData.frequency = "WEEKLY";
			updatedRecurrenceData.by_week_day = ["1", "2", "3", "4", "5"];
		}
		if (frequency === "CustomRange") {
			setNewFrequency("WEEKLY");
			updatedRecurrenceData.frequency = "WEEKLY";
			updatedRecurrenceData.by_week_day = filteredDay?.map(({ value }) => value).map((value) => Number(value));
		}
		setRecurrenceData(updatedRecurrenceData); // Update the state
	}, [frequency, byWeekdayList]);

	useEffect(() => {
		const updatedRecurrenceData = { ...recurrenceData }; // Create a copy
		if (selectedOption === "after") {
			updatedRecurrenceData.count = +count;
			// delete updatedRecurrenceData.end;
		}
		if (selectedOption === "on_date") {
			updatedRecurrenceData.end = end2;
			// delete updatedRecurrenceData.count;
		}
		setRecurrenceData(updatedRecurrenceData); // Update the state
	}, [selectedOption]);

	const toggleBoolValue = (value) => {
		setByWeekdayList((prevList) =>
			prevList.map((item) => (item.value === value ? { ...item, bool: !item.bool } : item)),
		);
	};

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title && !start && !end) {
			return;
		}
		title && start && end && (await createMeet(data));
		// console.log(createMeetData, "create meet data");
		dispatch(setScheduleDialogue(false));
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

	// console.log(timezone, "timezone");
	// console.log(start, "start");
	// console.log(end, "end");
	// console.log(attendeesList, "attendeesList");
	console.log(data, "data");

	return (
		<>
			<Backdrop />
			<form className={styles.dialogueBox} onSubmit={handleSubmit}>
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
				<label htmlFor="">Title*</label>

				<div className={styles.row}>
					<input
						type="text"
						placeholder="Enter title here..."
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						required
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
				<label>Date & Time*</label>
				<div className={styles.row}>
					{/* <label htmlFor="">Title</label> */}
					<input
						type="datetime-local"
						value={start}
						onChange={(e) => {
							setStart(convertDateToTimezoneDate(e.target.value, timezone));
						}}
						required
					/>
					<input
						type="datetime-local"
						value={end}
						onChange={(e) => {
							setEnd(e.target.value);
						}}
						required
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
							setStart(convertDateToTimezoneDate(start, timezone));
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
					<button type="button" onClick={addAttendeesHandler}>
						ADD
					</button>
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
									icon={null}
									options={list.map((x: any) => [{ name: x["name"], value: x["value"] }]).map((y: any) => y[0])}
									defaultValue={"DAILY"}
									onChange={(e) => {
										// console.log(e.target.value);
										setFrequency(e.target.value);
										setWhen(e.target.value);
									}}
								/>
							</span>
						)}
					</div>
					{isRepeat && (
						<div className={styles.endBox}>
							{when === "CustomRange" ? (
								<div>
									<label htmlFor="">Repeat Every:</label>
									<div className={styles.occurrence}>
										<input
											type="text"
											name=""
											id=""
											placeholder="1"
											// value={count}
											// onChange={(e) => {
											// 	setCount(e.target.value);
											// }}
										/>
										<Select
											options={repeatEveryList
												.map((x: any) => [{ name: x["name"], value: x["value"] }])
												.map((y: any) => y[0])}
											// value={frequency}
											onChange={(e) => {
												// console.log(e.target.value);
												// setWhen(e.target.value);
											}}
										/>
									</div>
									<label htmlFor="">Repeat On:</label>
									<div className={styles.repeat_on}>
										{byWeekdayList?.map((item) => (
											<span
												key={item.value}
												className={`${item.bool ? styles.active_day : {}}`}
												onClick={() => toggleBoolValue(item.value)}>
												{item.name}
											</span>
										))}
									</div>
								</div>
							) : (
								<></>
							)}

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
										value={end2}
										onChange={(e) => {
											setEnd2(e.target.value);
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
						type="button"
						className={styles.cancel}
						onClick={() => {
							dispatch(setScheduleDialogue(false));
						}}>
						Close
					</button>
					<button className={styles.submit} onClick={handleSubmit} type="submit">
						{isLoading ? <ClipLoader color="white" size={13} /> : "Schedule"}
					</button>
				</div>
			</form>
		</>
	);
};

export default ScheduleMeetingDialogue;

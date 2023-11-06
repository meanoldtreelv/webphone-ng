import { useEffect, useState } from "react";
import styles from "./EditMeet.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import Select from "components/UI/Forms/Select";

// import { editMeet } from "effects/apiEffect";
import { useDispatch, useSelector } from "react-redux";
import { setEditDialogue } from "redux/meet/meetSlice";
import { meetingDetails } from "redux/meet/meetSelectors";
import moment from "moment-timezone";
import { useLazyEditMeetQuery } from "services/meet";

// import { DateTime } from "luxon";
// import { useLazyCreateMeetQuery, useLazyGetMeetQuery } from "services/meet";
const timezones = moment.tz.names();

const EditMeet = () => {
	const [isRepeat, setIsRepeat] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [selectedOption, setSelectedOption] = useState("never");

	const [editMeet, { data: editMeetData, isLoading }] = useLazyEditMeetQuery();

	const dispatch = useDispatch();
	const editData = useSelector(meetingDetails);

	const filteredAttendees = editData?.attendees?.filter((item) => item.is_organizer === false);

	const newArray = filteredAttendees.map((obj) => ({ email: obj.email }));

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
	const [attendeesList, setAttendeesList] = useState<{}[]>(newArray);
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
		// password: password,
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

	const handleSubmit = async () => {
		await editMeet({ event_id: editData?.id, data });
		dispatch(setEditDialogue(false));
		// editMeet(
		// 	editData?.id,
		// 	data,
		// 	(res: any) => {
		// 		console.log(res, "meet created ");
		// 		if (res?.status === 200) {
		// 			console.log("success in account retrieve");
		// 			dispatch(setEditDialogue(false));
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in meet creation");
		// 	},
		// );
		// dispatch(setEditDialogue(false));
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

	useEffect(() => {
		console.log(deleteEmail);

		removeHandler(deleteEmail);
	}, [deleteEmail]);

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
					<label htmlFor="">Attendees added(1):</label>
					<div className={styles.attendees}>
						{editData?.organizer?.local_email} <span>(Organizer)</span>
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

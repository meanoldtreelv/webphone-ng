import { useEffect, useState } from "react";
import styles from "./EditMeet.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import Select from "components/UI/Forms/Select";
import { useDispatch, useSelector } from "react-redux";
import { setEditDialogue } from "redux/meet/meetSlice";
import { meetingDetails } from "redux/meet/meetSelectors";
import moment from "moment-timezone";
import { useLazyEditMeetQuery } from "services/meet";
import { ClipLoader } from "react-spinners";
const timezones = moment.tz.names();

const EditMeet = () => {
	const [selectedOption, setSelectedOption] = useState("never");

	const [editSrvrError, setEditSrvrError] = useState("");
	const [emailError, setEmailError] = useState(false);

	const [editMeet, { data: editMeetData, isLoading }] = useLazyEditMeetQuery();

	const dispatch = useDispatch();
	const editData = useSelector(meetingDetails);

	const filteredAttendees = editData?.attendees?.filter((item) => item.is_organizer === false);

	const newArray = filteredAttendees.map((obj) => ({ email: obj.email }));

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

	const [timezone, setTimezone] = useState("Africa/Abidjan");
	const [title, setTitle] = useState<string | null>(editData?.title);
	const [description, setDescription] = useState(editData?.description);
	const [start, setStart] = useState(convertDateToTimezoneDate(editData?.start, timezone));
	const [end, setEnd] = useState(convertDateToTimezoneDate(editData?.start, timezone));
	const [attendees, setAttendees] = useState<string | null>(null);
	const [attendeesList, setAttendeesList] = useState<{}[]>(newArray);

	const [deleteEmail, setDeleteEmail] = useState("");

	const data = {
		title: title,
		description: description,
		start: start + ":00Z",
		end: end + ":00Z",
		attendees: attendeesList,
	};

	useEffect(() => {
		setStart(convertDateToTimezoneDate(editData?.start, timezone));
		setEnd(convertDateToTimezoneDate(editData?.end, timezone));
	}, [timezone]);

	const handleSubmit = async () => {
		const { error } = await editMeet({ event_id: editData?.id, data });

		if (error) {
			setEditSrvrError("Something went wrong...!!");
		} else {
			setEditSrvrError("");
			dispatch(setEditDialogue(false));
		}
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

	const addAttendeesHandler = () => {
		setEmailError(false);
		if (!attendees?.includes("@")) {
			setEmailError(true);
			return;
		}
		setAttendeesList([
			...attendeesList,
			{
				email: attendees,
			},
		]);
		setAttendees("");
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
				</div>
				<label>Time Zone</label>
				<div className={styles.row2}>
					<Select
						options={timezones?.map((x: any) => [{ name: x, value: x }]).map((y: any) => y[0])}
						value={timezone}
						onChange={(e) => {
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

				{emailError && (
					<div style={{ color: "var(--text-danger)", fontSize: "11px" }}>Please enter correct email id !!</div>
				)}

				<div>
					<label htmlFor="">Attendees added(1):</label>
					<div className={styles.attendees}>
						{editData?.organizer?.local_email} <span>(Organizer)</span>
					</div>
					<div>
						{attendeesList?.map((item) => (
							<p key={item.email}>
								{item.email}
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
						{isLoading ? <ClipLoader color="white" size={13} /> : "Save"}
					</button>
				</div>
				{editSrvrError && <div style={{ color: "var(--text-danger)", fontSize: "11px" }}>{editSrvrError}</div>}
			</div>
		</>
	);
};

export default EditMeet;

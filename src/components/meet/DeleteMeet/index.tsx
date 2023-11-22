import { useEffect, useState } from "react";
import styles from "./DeleteMeet.module.scss";
import InfoIcon from "components/UI/Icons/Info";
import { ClipLoader } from "react-spinners";
import { setDeleteDialogue, setDescriptionDialogue } from "redux/meet/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { eventId, meetingDetails } from "redux/meet/meetSelectors";
// import { deleteMeet } from "effects/apiEffect";
import { useLazyDeleteAllMeetQuery, useLazyDeleteFollowingMeetQuery, useLazyDeleteMeetQuery } from "services/meet";
// import { useLazyDeleteMeetQuery } from "services/meet";

const DeleteMeet = () => {
	// const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState("option1");
	const dispatch = useDispatch();
	const event_id = useSelector(eventId);
	const meetSelected = useSelector(meetingDetails);

	const [deleteSrvrError, setDeleteSrvrError] = useState("");
	console.log("====================================");
	console.log(meetSelected);
	console.log("====================================");

	const [deleteMeet, { isLoading: isLoading1 }] = useLazyDeleteMeetQuery();
	const [deleteAllMeet, { isLoading: isLoading2 }] = useLazyDeleteAllMeetQuery();
	const [deleteFollowingMeet, { isLoading: isLoading3 }] = useLazyDeleteFollowingMeetQuery();
	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
	};

	const deleteHandler = async () => {
		if (selectedOption === "option1") {
			setDeleteSrvrError("");
			// await deleteMeet(event_id);
			const { error } = await deleteMeet(event_id);

			if (error) {
				setDeleteSrvrError("Something went wrong, please try again later...!!");
			} else {
				setDeleteSrvrError("");
				dispatch(setDeleteDialogue(false));
				dispatch(setDescriptionDialogue(false));
			}
		}
		if (selectedOption === "option2") {
			setDeleteSrvrError("");
			let currentDate = new Date(); // Creates a new Date object with the current date and time
			let year = currentDate.getFullYear(); // Extracts the year (YYYY)
			let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Extracts the month (MM)
			let day = String(currentDate.getDate()).padStart(2, "0"); // Extracts the day (DD)
			let formattedCurrentDate = `${year}-${month}-${day}`; // Constructs the formatted date str
			console.log(formattedCurrentDate);

			// await deleteAllMeet(meetSelected?.gid);
			const { error } = await deleteFollowingMeet({ g_id: meetSelected?.gid, from_date: formattedCurrentDate });

			if (error) {
				setDeleteSrvrError("Something went wrong, please try again later...!!");
			} else {
				setDeleteSrvrError("");
				dispatch(setDeleteDialogue(false));
				dispatch(setDescriptionDialogue(false));
			}
		}
		if (selectedOption === "option3") {
			setDeleteSrvrError("");
			// await deleteAllMeet(meetSelected?.gid);
			const { error } = await deleteAllMeet(meetSelected?.gid);

			if (error) {
				setDeleteSrvrError("Something went wrong, please try again later...!!");
			} else {
				setDeleteSrvrError("");
				dispatch(setDeleteDialogue(false));
				dispatch(setDescriptionDialogue(false));
			}
		}
	};

	return (
		<div className={styles.overlay}>
			{/* {<Backdrop />} */}
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					{/* */}
					<div className={styles.delete_head}>
						{meetSelected?.recurrence ? "Delete Meet ?" : "Are you sure you want to delete this meeting?"}
					</div>
					{meetSelected?.recurrence && (
						<div className={styles.delete_ques}>{"Please select one of the following options"}</div>
					)}
				</div>

				{meetSelected?.recurrence && (
					<div>
						<form>
							<label>
								<input
									type="radio"
									value="option1"
									checked={selectedOption === "option1"}
									onChange={handleOptionChange}
								/>
								This meet
							</label>
							<label>
								<input
									type="radio"
									value="option2"
									checked={selectedOption === "option2"}
									onChange={handleOptionChange}
								/>
								This and following meets
							</label>
							<label>
								<input
									type="radio"
									value="option3"
									checked={selectedOption === "option3"}
									onChange={handleOptionChange}
								/>
								All meets from sequence
							</label>
						</form>
					</div>
				)}

				<div className={styles.delete_btnCont}>
					<button className={styles.delete_cancelBtn} onClick={() => dispatch(setDeleteDialogue(false))}>
						<span>No</span>
					</button>
					<button className={styles.delete_deleteBtn} onClick={deleteHandler}>
						{isLoading1 || isLoading2 || isLoading3 ? (
							<>
								<ClipLoader color="white" size={13} />
								<span style={{ marginLeft: "7px" }}>Deleting...</span>
							</>
						) : (
							<span>{"Yes"}</span>
						)}
					</button>
				</div>
				{deleteSrvrError && <div style={{ color: "var(--text-danger)", fontSize: "11px" }}>{deleteSrvrError}</div>}
			</div>
		</div>
	);
};

export default DeleteMeet;

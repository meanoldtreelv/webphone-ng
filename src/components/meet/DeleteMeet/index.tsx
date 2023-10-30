import { useState } from "react";
import styles from "./DeleteMeet.module.scss";
import InfoIcon from "components/UI/Icons/Info";
import { ClipLoader } from "react-spinners";
import { setDeleteDialogue, setDescriptionDialogue } from "redux/meet/meetSlice";
import { useDispatch, useSelector } from "react-redux";
import { eventId } from "redux/meet/meetSelectors";
import { deleteMeet } from "effects/apiEffect";
// import { useLazyDeleteMeetQuery } from "services/meet";

const DeleteMeet = () => {
	const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState("option1");
	const dispatch = useDispatch();
	const event_id = useSelector(eventId);

	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
	};

	const deleteHandler = () => {
		deleteMeet(
			event_id,
			(res: any) => {
				console.log(res, "delete event API retrieve");
				if (res?.status === 204) {
					console.log("success in delete event retrieve");
					dispatch(setDeleteDialogue(false));
					dispatch(setDescriptionDialogue(false));
				}
			},
			(err: any) => {
				console.error(err, "err in delete event retrieve");
			},
		);
		// useLazyDeleteMeetQuery(event_id);

		// dispatch(seteventId(""));
	};

	return (
		<div className={styles.overlay}>
			{/* {<Backdrop />} */}
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={styles.delete_head}>Delete test Meet?</div>
					<div className={styles.delete_ques}>{"Please select one of the following options"}</div>
				</div>

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

				<div className={styles.delete_btnCont}>
					<button className={styles.delete_cancelBtn} onClick={() => dispatch(setDeleteDialogue(false))}>
						<span>No</span>
					</button>
					<button className={styles.delete_deleteBtn}>
						{loading ? (
							<>
								<ClipLoader color="white" size={13} />
								<span style={{ marginLeft: "7px" }}>Deleting...</span>
							</>
						) : (
							<span onClick={deleteHandler}>{"Yes"}</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteMeet;

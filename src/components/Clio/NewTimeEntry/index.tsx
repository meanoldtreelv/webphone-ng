import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import styles from "./NewTimeEntry.module.scss";
import { useDispatch } from "react-redux";
import { setIsAddNoteOpen, setIsAddTaskOpen, setIsNewExpenseOpen, setIsNewTimeEntryOpen } from "redux/clio/clioSlice";

const NewTimeEntry = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.box}>
			<div className={styles.heading}>
				<span
					className={styles.chevron}
					onClick={() => {
						dispatch(setIsNewTimeEntryOpen(false));
					}}>
					<ChevronLeftIcon />
				</span>

				<span>New Time Entry</span>
			</div>
			<div className={styles.notes_details}>
				<div>
					<label htmlFor="activity_category">Activity Category </label>
					<select name="activity_category" id="activity_category">
						<option value={""}>High</option>
						<option value={""}>Normal</option>
						<option value={""}>Low</option>
					</select>
				</div>
				<div>
					<label htmlFor="quantity">Duration</label>
					<br />
					<input type="text" placeholder="Enter quantity here..." id="duration" />
				</div>
				<div>
					<label htmlFor="rate">Rate</label>
					<br />
					<input type="text" placeholder="Enter rate here..." id="rate" />
				</div>

				<div>
					<label htmlFor="firm_user">Firm User</label>
					<select name="firm_user" id="firm_user">
						<option value={""}>None</option>
						<option value={""}>Deep </option>
						<option value={""}>Shivam</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="matter">Matter </label>
					<select name="matter" id="matter">
						<option value={""}>None</option>
						<option value={""}>matter 1 </option>
						<option value={""}>Matter 2</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="date">Date</label>
					<br />
					<input type="date" placeholder="Enter date here..." id="date" />
				</div>
				<textarea name="" id="" cols={"100%"} rows={10} placeholder="Enter description here..."></textarea>
				<button>Save </button>
			</div>
		</div>
	);
};

export default NewTimeEntry;

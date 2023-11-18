import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import styles from "./AddTask.module.scss";
import { useDispatch } from "react-redux";
import { setIsAddNoteOpen, setIsAddTaskOpen } from "redux/clio/clioSlice";

const AddTask = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.box}>
			<div className={styles.heading}>
				<span
					className={styles.chevron}
					onClick={() => {
						dispatch(setIsAddTaskOpen(false));
					}}>
					<ChevronLeftIcon />
				</span>
				<span>Add Task</span>
			</div>
			<div className={styles.notes_details}>
				<div>
					<label htmlFor="">Name</label>
					<br />
					<input type="text" placeholder="Enter name here..." />
				</div>
				<div>
					<label htmlFor="selected_matter">Priority </label>
					<select name="selected_matter" id="selected_matter">
						<option value={""}>High</option>
						<option value={""}>Normal</option>
						<option value={""}>Low</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Assign to* </label>
					<select name="call_purpose" id="call_purpose">
						<option value={""}>None</option>
						<option value={""}>Deep </option>
						<option value={""}>Shivam</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Matter </label>
					<select name="call_purpose" id="call_purpose">
						<option value={""}>None</option>
						<option value={""}>matter 1 </option>
						<option value={""}>Matter 2</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Due Date</label>
					<br />
					<input type="date" placeholder="Enter due date here..." />
				</div>
				<textarea name="" id="" cols="100%" rows="10" placeholder="Enter task description here..."></textarea>
				<button>Add Task</button>
			</div>
		</div>
	);
};

export default AddTask;

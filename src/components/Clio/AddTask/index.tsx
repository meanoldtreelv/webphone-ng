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
					<label htmlFor="name">Name</label>
					<br />
					<input type="text" placeholder="Enter name here..." id="name" />
				</div>
				<div>
					<label htmlFor="priority">Priority </label>
					<select name="priority" id="priority">
						<option value={""}>High</option>
						<option value={""}>Normal</option>
						<option value={""}>Low</option>
					</select>
				</div>
				<div>
					<label htmlFor="assign_to">Assign to* </label>
					<select name="assign_to" id="assign_to">
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
					<label htmlFor="due_date">Due Date</label>
					<br />
					<input type="date" placeholder="Enter due date here..." id="due_date" />
				</div>
				<textarea name="" id="" cols="100%" rows="10" placeholder="Enter task description here..."></textarea>
				<button>Add Task</button>
			</div>
		</div>
	);
};

export default AddTask;

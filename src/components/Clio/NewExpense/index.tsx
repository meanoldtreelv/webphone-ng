import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import styles from "./NewExpense.module.scss";
import { useDispatch } from "react-redux";
import { setIsAddNoteOpen, setIsAddTaskOpen, setIsNewExpenseOpen } from "redux/clio/clioSlice";

const NewExpense = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.box}>
			<div className={styles.heading}>
				<span
					className={styles.chevron}
					onClick={() => {
						dispatch(setIsNewExpenseOpen(false));
					}}>
					<ChevronLeftIcon />
				</span>
				<span>New Expense</span>
			</div>
			<div className={styles.notes_details}>
				<div>
					<label htmlFor="">Expense Category </label>
					<select name="" id="">
						<option value={""}>High</option>
						<option value={""}>Normal</option>
						<option value={""}>Low</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Quantity</label>
					<br />
					<input type="text" placeholder="Enter quantity here..." />
				</div>
				<div>
					<label htmlFor="">Rate</label>
					<br />
					<input type="text" placeholder="Enter rate here..." />
				</div>
				<div>
					<label htmlFor="">Amount</label>
					<br />
					<input type="text" placeholder="Enter amount here..." />
				</div>
				<div>
					<label htmlFor="">Firm User</label>
					<select name="" id="">
						<option value={""}>None</option>
						<option value={""}>Deep </option>
						<option value={""}>Shivam</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Matter </label>
					<select name="" id="">
						<option value={""}>None</option>
						<option value={""}>matter 1 </option>
						<option value={""}>Matter 2</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Date</label>
					<br />
					<input type="date" placeholder="Enter date here..." />
				</div>
				<textarea name="" id="" cols="100%" rows="10" placeholder="Enter description here..."></textarea>
				<button>Save Expense</button>
			</div>
		</div>
	);
};

export default NewExpense;

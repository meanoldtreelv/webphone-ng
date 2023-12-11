import styles from "./AddContactDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import AddUserIcon from "components/UI/Icons/VideoCall/AddUser";
import { useDispatch } from "react-redux";
import { setIsAddContactDialogueOpen } from "redux/chat/chatSlice";

const AddContactDialogue = () => {
	const dispatch = useDispatch();

	const addContactHandler = () => {
		dispatch(setIsAddContactDialogueOpen(false));
	};
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<AddUserIcon />
						<span>Add New Contact</span>
					</span>

					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsAddContactDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</h1>

				<div className={styles.row}>
					<label htmlFor="">First Name*</label>
					<input type="text" />
				</div>

				<div className={styles.row}>
					<label htmlFor="">Last Name*</label>
					<input type="text" />
				</div>

				<div className={styles.row}>
					<label htmlFor="">Number*</label>
					<input type="text" />
				</div>

				<div className={styles.btnBox}>
					<button onClick={addContactHandler}>Add</button>
				</div>
			</div>
		</>
	);
};

export default AddContactDialogue;

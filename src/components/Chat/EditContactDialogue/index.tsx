import styles from "./EditContactDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import CloseIcon from "components/UI/Icons/Close";
import AddUserIcon from "components/UI/Icons/VideoCall/AddUser";
import { useDispatch } from "react-redux";
import { setIsEditContactDialogueOpen } from "redux/chat/chatSlice";

const EditContactDialogue = () => {
	const dispatch = useDispatch();

	const editContactHandler = () => {
		dispatch(setIsEditContactDialogueOpen(false));
	};

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<EditIcon />
						<span>Edit Contact Info</span>
					</span>

					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsEditContactDialogueOpen(false));
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
					<button onClick={editContactHandler}>Save</button>
				</div>
			</div>
		</>
	);
};

export default EditContactDialogue;

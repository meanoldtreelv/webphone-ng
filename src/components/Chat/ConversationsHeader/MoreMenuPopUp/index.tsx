import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import DeleteIcon from "components/UI/Icons/Delete";
import styles from "./MoreMenuPopUp.module.scss";
import InfoIcon from "components/UI/Icons/ChatIcons/Info";
import { useDispatch } from "react-redux";
import { setIsContactDetailsDialogueOpen, setIsEditContactDialogueOpen } from "redux/chat/chatSlice";

const MoreMenuPopUp = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.popUp}>
			<div
				onClick={() => {
					dispatch(setIsEditContactDialogueOpen(true));
				}}>
				<span>
					<EditIcon />
				</span>
				<span>Edit Contact</span>
			</div>
			{/* <div>
				<span>
					<DeleteIcon />
				</span>
				<span>Delete Chat</span>
			</div> */}
			<div
				onClick={() => {
					dispatch(setIsContactDetailsDialogueOpen(true));
				}}>
				<span>
					<InfoIcon />
				</span>
				<span>Details</span>
			</div>
		</div>
	);
};

export default MoreMenuPopUp;

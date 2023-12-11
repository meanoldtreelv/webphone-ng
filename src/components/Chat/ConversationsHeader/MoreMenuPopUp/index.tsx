import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import DeleteIcon from "components/UI/Icons/Delete";
import styles from "./MoreMenuPopUp.module.scss";

const MoreMenuPopUp = () => {
	return (
		<div className={styles.popUp}>
			<div>
				<span>
					<EditIcon />
				</span>
				<span>Edit Contact</span>
			</div>
			<div>
				<span>
					<DeleteIcon />
				</span>
				<span>Delete Chat</span>
			</div>
		</div>
	);
};

export default MoreMenuPopUp;

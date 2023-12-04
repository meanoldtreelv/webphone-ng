import styles from "./SharePopUp.module.scss";
import UserGroupIcon from "components/UI/Icons/Sidebar/UserGroup";
import UploadIcon from "components/UI/Icons/ChatIcons/Upload";

const SharePopUp = () => {
	return (
		<div className={styles.share}>
			<div>
				<span>
					<UploadIcon />
				</span>
				<span>Upload from your computer</span>
			</div>
			<div>
				<span>
					<UserGroupIcon color="icon-primary" />
				</span>
				<span>Share contacts</span>
			</div>
		</div>
	);
};

export default SharePopUp;

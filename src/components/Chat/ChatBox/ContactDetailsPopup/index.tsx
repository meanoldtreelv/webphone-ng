import styles from "./ContactDetailsPopUp.module.scss";
import AddUserIcon from "components/UI/Icons/VideoCall/AddUser";
import InfoIcon from "components/UI/Icons/Info";
import DownloadIcon from "components/UI/Icons/meet/Download";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";

const ContactDetailsPopUp = () => {
	return (
		<div className={styles.share}>
			<div>
				<span>
					<EditIcon color="icon-primary" />
				</span>
				<span>Start Messaging</span>
			</div>
			<div>
				<span>
					<AddUserIcon color="icon-primary" />
				</span>
				<span>Add to Contacts</span>
			</div>
			<div>
				<span>
					<InfoIcon color="icon-primary" />
				</span>
				<span>Contact Info</span>
			</div>
			<div>
				<span>
					<DownloadIcon color="icon-primary" />
				</span>
				<span>Download VCF</span>
			</div>
		</div>
	);
};

export default ContactDetailsPopUp;

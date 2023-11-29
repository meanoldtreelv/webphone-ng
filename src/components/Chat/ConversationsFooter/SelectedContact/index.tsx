import styles from "./SelectedContact.module.scss";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";

const SelectedContact = () => {
	return (
		<div className={styles.selectedContact}>
			<p className={styles.initials}> SG</p>
			<b>Shivam Gupta</b>
			<span>
				<CrossIcon />
			</span>
		</div>
	);
};

export default SelectedContact;

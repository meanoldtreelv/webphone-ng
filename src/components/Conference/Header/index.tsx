import styles from "./Header.module.scss";
import EditIcon from "components/UI/Icons/Edit";

const index = () => {
	return (
		<div className={styles.conferenceHeader}>
			<h2>Team Group</h2>
			<div className={styles.headerAction}>
				<button className={styles.headerAction_edit}>
					<div className={styles.editIcon}>
						<EditIcon />
					</div>
					<span>Edit</span>
				</button>
				<button className={styles.startConference}>Start Conference</button>
			</div>
		</div>
	);
};

export default index;

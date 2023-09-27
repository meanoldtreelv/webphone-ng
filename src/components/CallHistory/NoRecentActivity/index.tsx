import styles from "./NoRecentActivity.module.scss";
import noContactsImg from "./../../../assets/images/icon/no_contacts.svg";

const NoRecentActivity = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noContactsImg} alt="" />
				<h3>No Recent Activity</h3>
				<p>When you call members you'll see the activity here</p>
			</div>
		</section>
	);
};

export default NoRecentActivity;

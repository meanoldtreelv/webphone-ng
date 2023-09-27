import styles from "./ContactDetails.module.scss";
import PhoneIcon from "components/UI/Icons/Phone";
import ChatIcon from "components/UI/Icons/Chat";

const ContactDetails = () => {
	return (
		<section className={styles.contactDetails}>
			<div className={styles.contactDetails_box}>
				<div className={styles.contactInfo}>
					<div className={styles.rowBox}>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Name</p>
								<p className={styles.cardValue}>Luis Arnold</p>
							</div>
							<span className={styles.contactInfoText}>Contact Info</span>
						</div>
					</div>
					<div className={styles.rowBox}>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Phone</p>
								<p className={styles.cardValue}>+1(234) 687 5520</p>
							</div>
							<div className={styles.iconBox}>
								<PhoneIcon />
								<ChatIcon />
							</div>
						</div>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Date</p>
								<p className={styles.cardValue}>Monday, March 13, 2023 6:33 PM</p>
							</div>
						</div>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Type</p>
								<p className={styles.cardValue}>Missed Call</p>
							</div>
						</div>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Duration</p>
								<p className={styles.cardValue}>Ring 2 time</p>
							</div>
						</div>
					</div>
					<button className={styles.deleteRecord}>Delete Record</button>
				</div>
			</div>
		</section>
	);
};

export default ContactDetails;

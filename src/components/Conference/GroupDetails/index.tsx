import styles from "./GroupDetails.module.scss";
// import HistoryCard from "./HistoryCard";

const GroupDetails = () => {
	return (
		<section className={styles.contactDetails}>
			<div className={styles.contactDetails_box}>
				<div className={styles.heading}>Group Info</div>
				<div className={styles.contactInfo}>
					<div className={styles.rowBox}>
						<div className={styles.row}>
							<div>
								<p className={styles.detailsTitle}>Group Name</p>
								<p className={styles.detailsVal}>Team Group</p>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.detailsInfo}>
								<p className={styles.detailsTitle}>Description</p>
								<p className={styles.detailsVal}>Conference group for our team and for other important discuss</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GroupDetails;

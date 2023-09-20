import { useState } from "react";
import styles from "./GroupDetails.module.scss";
// import HistoryCard from "./HistoryCard";

const GroupDetails = () => {
	const [activeButton, setActiveButton] = useState("1");
	const contactActiveButton = {
		background: "var(--primary-default, #0c6dc7)",
		boxShadow: "0px 4px 4px 0px rgba(12, 109, 199, 0.15)",
		color: "var(--text-on-color, #FFF)",
		fontWeight: "500",
	};
	return (
		<section className={styles.contactDetails}>
			<div className={styles.contactDetails_box}>
				<div className={`body_bold ${styles.heading}`} style={{color: "var(--text-primary, #1F2023)"}}> Group Info</div>
				<div className={styles.contactInfo}>
					<div className={styles.rowBox}>
						<div className={styles.row}>
							<div>
								<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
									Group Name
								</p>
								<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
									Team Group
								</p>
							</div>
						</div>
						<div className={styles.row}>
							<div>
								<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
									Description
								</p>
								<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
									Conference group for our team and for other important discuss
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GroupDetails;

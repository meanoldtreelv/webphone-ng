import { useState } from "react";
import styles from "./ContactDetails.module.scss";
import PhoneIcon from "components/UI/Icons/Phone";
import ChatIcon from "components/UI/Icons/Chat";

const ContactDetails = () => {
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
				{activeButton === "1" ? (
					<div className={styles.contactInfo}>
						<div className={styles.rowBox}>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
									Name
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
									Luis Arnold
									</p>
								</div>
								<div className={`caption_1_bold ${styles.contactInfoText}`}>
									<span>
										Contact Info
									</span>
								
								</div>
							</div>
						</div>
						<div className={styles.rowBox}>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Phone
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										+1(234) 687 5520
									</p>
								</div>
								<div className={styles.iconBox}>
									<PhoneIcon />
									<ChatIcon />
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Date
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Monday, March 13, 2023 6:33 PM
									</p>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Type
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Missed Call
									</p>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Duration
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Ring 2 time
									</p>
								</div>
							</div>
						</div>
						<p
							className={`footnote_bold cursor-pointer`}
							style={{ color: "var(--support-danger, #EE3939)", textAlign: "left", width: "100%" }}>
							Delete Record
						</p>
					</div>
				) : (
					<div className={styles.callHistory}>
						<div>
							<p className={`caption_2 py-2 px-4`} style={{ color: "var(--text-secondary, #5C6168)" }}>
								Today (6)
							</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ContactDetails;

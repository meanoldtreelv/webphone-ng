import styles from "./ReceiveContact.module.scss";
import ThreeDots from "components/UI/Icons/meet/ThreeDots";
import ContactDetailsPopUp from "../ContactDetailsPopup";

const ReceiveContact = () => {
	return (
		<div className={styles.receiveContact}>
			<div className={styles.contactBox}>
				<div className={styles.contact}>
					<div>
						<span className={styles.initials}>SG</span>
						<span className={styles.details}>
							<span className={styles.name}>Shivam Gupta </span>
							<span className={styles.number}>987643131</span>
						</span>
					</div>
					<span>
						<ThreeDots />
					</span>
					{false && <ContactDetailsPopUp />}
				</div>
				<div className={styles.contact}>
					<div>
						<span className={styles.initials}>SG</span>
						<span className={styles.details}>
							<span className={styles.name}>Shivam Gupta Delhi India </span>
							<span className={styles.number}>987643131</span>
						</span>
					</div>
					<span>
						<ThreeDots />
					</span>
				</div>
			</div>
		</div>
	);
};

export default ReceiveContact;

import styles from "./SendContact.module.scss";
import ThreeDots from "components/UI/Icons/meet/ThreeDots";
import ContactDetailsPopUp from "../ContactDetailsPopup";
import { useState } from "react";

const SendContact = () => {
	const [isContactMenuPopUpOpen, setIsContactMenuPopUpOpen] = useState(false);
	return (
		<div className={styles.sendContact}>
			<div className={styles.contactBox}>
				<div className={styles.contact}>
					<div>
						<span className={styles.initials}>SG</span>
						<span className={styles.details}>
							<span className={styles.name}>Shivam Gupta </span>
							<span className={styles.number}>987643131</span>
						</span>
					</div>
					<span
						onClick={() => {
							setIsContactMenuPopUpOpen(!isContactMenuPopUpOpen);
						}}>
						<ThreeDots />
					</span>
					{isContactMenuPopUpOpen && <ContactDetailsPopUp />}
				</div>
				<div className={styles.contact}>
					<div>
						<span className={styles.initials}>SG</span>
						<span className={styles.details}>
							<span className={styles.name}>Shivam Gupta Delhi India </span>
							<span className={styles.number}>987643131</span>
						</span>
					</div>
					<span
						onClick={() => {
							setIsContactMenuPopUpOpen(!isContactMenuPopUpOpen);
						}}>
						<ThreeDots />
					</span>
					{isContactMenuPopUpOpen && <ContactDetailsPopUp />}
				</div>
			</div>
		</div>
	);
};

export default SendContact;

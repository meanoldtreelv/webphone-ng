import styles from "./ContactDetails.module.scss";
import PhoneIcon from "components/UI/Icons/Phone";
import ChatIcon from "components/UI/Icons/Chat";
import { useSelector } from "react-redux";
import { callHistory, selectedCallHistory } from "redux/call-history/callHistorySelectors";
import { useGetAccountQuery } from "services/system";
import { formatDate, longDateTimeFormat } from "helpers/formatDateTime";
import { useNavigate } from "react-router";
import sip from "lib/sip";

const ContactDetails = () => {
	const callHistoryDetails = useSelector(selectedCallHistory);
	const navigate = useNavigate();

	const handleCall = () => {
		sip.call(String(callHistoryDetails?.cdr?.dst));
		navigate("/dashboard");
	};

	return (
		<section className={styles.contactDetails}>
			<div className={styles.contactDetails_box}>
				<div className={styles.contactInfo}>
					<div className={styles.rowBox}>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Name</p>
								<p className={styles.cardValue}>{callHistoryDetails?.cdr?.dst}</p>
							</div>
							{/* <span className={styles.contactInfoText}>Contact Info</span> */}
						</div>
					</div>
					<div className={styles.rowBox}>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Phone</p>
								<p className={styles.cardValue}>{callHistoryDetails?.cdr?.dst}</p>
							</div>
							<div className={styles.iconBox}>
								<button onClick={handleCall}>
									<PhoneIcon />
								</button>
								{/* <ChatIcon /> */}
							</div>
						</div>
						<div className={styles.row}>
							<div>
								<p className={styles.cardLabel}>Date</p>
								<p className={styles.cardValue}>
									{longDateTimeFormat(callHistoryDetails?.cdr?.starttime)}
									{formatDate(callHistoryDetails?.cdr?.starttime)}
								</p>
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

					{/* <button className={styles.deleteRecord}>Delete Record</button> */}
				</div>
			</div>
		</section>
	);
};

export default ContactDetails;

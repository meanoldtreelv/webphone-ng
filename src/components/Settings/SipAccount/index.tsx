import React from "react";
import styles from "./SipAccount.module.scss";
import EditIcon from "components/UI/Icons/Edit";
import DeleteIcon from "components/UI/Icons/Delete";

const SipAccount = () => {
	return (
		<div className={styles.account}>
			<h1 className={`body_bold ${styles.heading}`}>Default Identity</h1>
			<div className={styles.sipAddressBox}>
				<p className={`caption_1 ${styles.addressHeading}`}>SIP Address:</p>
				<p className={`body ${styles.address}`}>
					<span>sip:</span>
					{"valentynsebalo@192.168.0.1"}
				</p>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Proxy</h1>
			<div className={`caption_2 ${styles.heading2}`}>
				<span>SIP Account</span>
				<span>Actions</span>
			</div>
			<div className={styles.sipAccount}>
				<span className={`footnote ${styles.sipAccount_id}`}>
					<span>sip:</span>
					{"131513@ztelcocdnwt.ringplan.com"}
				</span>
				<span className={styles.sipAccount_actions}>
					<EditIcon />
					<DeleteIcon />
				</span>
			</div>
		</div>
	);
};

export default SipAccount;

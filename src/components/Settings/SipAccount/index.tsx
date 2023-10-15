import React from "react";
import styles from "./SipAccount.module.scss";
import EditIcon from "components/UI/Icons/Edit";
import DeleteIcon from "components/UI/Icons/Delete";
import { getCookie } from "utils";

const SipAccount = () => {
	return (
		<div className={styles.account}>
			<h1 className={`body_bold ${styles.heading}`}>Default Identity</h1>
			<div className={styles.sipAddressBox}>
				<p className={`caption_1 ${styles.addressHeading}`}>SIP Address:</p>
				<p className={`body ${styles.address}`}>
					<span>sip:</span>
					{getCookie('ext_user_id')}@{getCookie('ext_domain')}
				</p>
			</div>
			{/* <h1 className={`body_bold ${styles.heading}`}>Proxy</h1>
			<div className={`caption_2 ${styles.heading2}`}>
				<span>SIP Account</span>
				<span>Actions</span>
			</div>
			<div className={styles.sipAccount}>
				<span className={`footnote ${styles.sipAccount_id}`}>
					<span>sip:</span>
					<span>131513@ztelcocdnwt.ringplan.com</span>
				</span>
				<span className={styles.sipAccount_actions}>
					<span>
						<EditIcon />
					</span>

					<span>
						<DeleteIcon />
					</span>
				</span>
			</div> */}
		</div>
	);
};

export default SipAccount;

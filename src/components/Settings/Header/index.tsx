import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={`sub_headline_bold ${styles.heading}`}>Settings</div>
			<div className={`body ${styles.tabBox}`}>
				<span>SIP Account</span>
				<span>Audio</span>
				<span>Video</span>
				<span>User Interface</span>
				<span>Advance</span>
			</div>
		</div>
	);
};

export default Header;

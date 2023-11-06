import { useState } from "react";
import styles from "./Header.module.scss";
import ProfileAndExtension from "components/shared/ProfileAndExtension";

const Header = () => {
	return (
		<div className={styles.header}>
			<h1>Meet</h1>

			<div className={styles.profile}>
				<ProfileAndExtension />
			</div>
		</div>
	);
};

export default Header;

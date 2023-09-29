import React from "react";
import styles from "./Header.module.scss";
import SearchBar from "components/UI/SearchBar";
import ProfileAndExtension from "components/shared/ProfileAndExtension";

const Header = () => {
	return (
		<div className={styles.header}>
			<h1>Sidecar Manage</h1>
			<div className={styles.searchComp}>
				<SearchBar />
			</div>
			<div className={styles.profile}>
				<ProfileAndExtension />
			</div>
		</div>
	);
};

export default Header;

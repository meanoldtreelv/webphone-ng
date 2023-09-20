import styles from "./Header.module.scss";

const Header = () => {
	return (
		<section className={styles.header}>
			<div className={`sub_headline_bold ${styles.header_pageName}`}>Recents</div>
		</section>
	);
};

export default Header;
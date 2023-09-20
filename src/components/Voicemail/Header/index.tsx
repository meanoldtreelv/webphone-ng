import SearchIcon from "components/UI/Icons/Search";
import styles from "./Header.module.scss";
import FilterIcon from "components/UI/Icons/Filter";
import CalendarIcon from "components/UI/Icons/Calendar";

const Header = () => {
	return (
		<section className={styles.header}>
			<div className={`sub_headline_bold ${styles.header_pageName}`} style={{ color: "var(--text-primary, #1F2023)" }}>
				Voicemail
			</div>
			<div className={styles.header_cont}>
				<div className={styles.header_search}>
					<input type="text" placeholder="Search number" />
					<SearchIcon />
				</div>
				<span>
					<FilterIcon />
				</span>
				<span>
					<CalendarIcon />
				</span>
			</div>
		</section>
	);
};

export default Header;

import SearchIcon from "components/UI/Icons/Search";
import styles from "./Header.module.scss";
import FilterIcon from "components/UI/Icons/Filter";
import CalendarIcon from "components/UI/Icons/Calendar";

const Header = () => {
	return (
		<section className={styles.header}>
			<div className={styles.header_pageName}>Voicemail</div>
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

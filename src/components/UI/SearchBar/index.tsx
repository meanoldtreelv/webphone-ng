import React from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../Icons/Search";

const SearchBar = () => {
	// Todo :- Logic should be implemented
	return (
		<div className={styles.search}>
			<input type="text" placeholder="Search number" />
			<SearchIcon />
		</div>
	);
};

export default SearchBar;

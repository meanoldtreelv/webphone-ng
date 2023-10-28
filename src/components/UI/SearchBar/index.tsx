import React from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../Icons/Search";
import { IInput } from "constants/interfaces";

const SearchBar: React.FC<IInput> = ({ type = "text", placeholder, required, onChange, value, disabled }) => {
	// Todo :- Logic should be implemented
	return (
		<div className={styles.search}>
			<input
				type={type}
				placeholder={"Search call history..."}
				onChange={onChange}
				required={required}
				value={value}
				disabled={disabled}
			/>
			<SearchIcon />
		</div>
	);
};

export default SearchBar;

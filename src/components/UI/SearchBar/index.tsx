import React from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../Icons/Search";
import { IInput } from "constants/interfaces";

const SearchBar: React.FC<IInput> = ({ type = "text", placeholder, required, onChange, value, disabled }) => {
	return (
		<div className={styles.search}>
			<input
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				value={value}
				disabled={disabled}
			/>
			<span>
				<SearchIcon />
			</span>
		</div>
	);
};

export default SearchBar;

import React from "react";
import styles from "./Select.module.scss";

const Select = ({ icon, options }) => {
	return (
		<div className={`${styles.optionBox}`}>
			<select name="" id="" className={`caption_1`}>
				{options?.map(() => <option value="">MacBook Pro Speakers</option>)}
				<option value="">MacBook Pro Speakers</option>
				<option value="">MacBook Pro Speakers</option>
				<option value="">MacBook Pro Speakers</option>
			</select>
			<span>{icon}</span>
		</div>
	);
};

export default Select;

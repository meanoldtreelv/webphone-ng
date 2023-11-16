import React from "react";
import styles from "./Notes.module.scss";

const Notes = () => {
	return (
		<div className={styles.box}>
			<div className={styles.heading}>
				<span>Add Note</span>
			</div>
			<div className={styles.notes_details}>
				<div>
					<label htmlFor="selected_matter">Selected Matter </label>
					<select name="selected_matter" id="selected_matter">
						<option value={""}>No Matter Selected</option>
						<option value={""}>00132 - Live free or pie, LLC</option>
						<option value={""}>00132 - Live free or pie, LLC</option>
					</select>
				</div>
				<div>
					<label htmlFor="">Call Purpose </label>
					<select name="call_purpose" id="call_purpose">
						<option value={""}>New Matter</option>
						<option value={""}>A/R Follow Up</option>
						<option value={""}>Matter Releted Update</option>
						<option value={""}>General Inquiry</option>
						<option value={""}>Other</option>
					</select>
				</div>
				<textarea name="" id="" cols="100%" rows="10" placeholder="Add this call notes here"></textarea>
			</div>
		</div>
	);
};

export default Notes;

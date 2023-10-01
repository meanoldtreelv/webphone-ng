import React from "react";
import styles from "./ActionBtnCard.module.scss";
import EditIcon from "components/UI/Icons/Edit";
import DeleteIcon from "components/UI/Icons/Delete";

const ActionBtnCard = () => {
	return (
		<div className={styles.actionBtn}>
			<h3>Change My Status</h3>
			<p>
				<span>Actions: </span> <span>1</span>
			</p>
			<span>
				<EditIcon />
				<DeleteIcon />
			</span>
		</div>
	);
};

export default ActionBtnCard;

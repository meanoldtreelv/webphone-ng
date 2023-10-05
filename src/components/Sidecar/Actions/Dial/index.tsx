import React from "react";
import styles from "./Dial.module.scss";
import DialIcon from "components/UI/Icons/Sidecar/Dial";
import DeleteIcon from "components/UI/Icons/Delete";

const DialActionCard = () => {
	return (
		<div className={styles.card}>
			<p>
				<DialIcon />
				<span>Dials</span>
			</p>
			<p>
				<span className={styles.extension}>60709</span>
				<DeleteIcon />
			</p>
		</div>
	);
};

export default DialActionCard;

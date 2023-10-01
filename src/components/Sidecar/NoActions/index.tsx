import Button from "components/UI/Forms/Button";
import React from "react";
import styles from "./NoActions.module.scss";

const NoActions = () => {
	return (
		<section className={styles.noAction}>
			<div className={styles.noActionBox}>
				<h1>No Actions</h1>
				<p>When you add actions you’ll see them here</p>
				<Button />
			</div>
		</section>
	);
};

export default NoActions;

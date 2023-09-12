import React from "react";
import classes from "./noContact.module.scss";

const NoContactSelected = () => {
	return (
		<section className={classes.noContact}>
			<div className={classes.noContact_box}>
				<img src="/icon/no_selected.svg" alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Contact Selected
				</div>
				<div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					Select a contact to view details
				</div>
			</div>
		</section>
	);
};

export default NoContactSelected;

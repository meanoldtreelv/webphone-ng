import React from "react";
import classes from "./noRecordSelected.module.scss";

const NoRecordSelected = () => {
	return (
		<section className={classes.noContact}>
			<div className={classes.noContact_box}>
				<img src="/icon/no_selected.svg" alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Record Selected
				</div>
				<div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					To view detailed info select a record item from the list
				</div>
			</div>
		</section>
	);
};

export default NoRecordSelected;

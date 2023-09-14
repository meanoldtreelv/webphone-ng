import React from "react";
import classes from "./noGroupSelected.module.scss";

const NoGroupSelected = () => {
	return (
		<section className={classes.noContact}>
			<div className={classes.noContact_box}>
				<img src="/icon/no_selected.svg" alt="" />
				<div className={`title_3_bold ${classes.noContact_head}`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Group Selected
				</div>
				<div className={`body ${classes.noContact_info}`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					To view detailed info select a group from list
				</div>
			</div>
		</section>
	);
};

export default NoGroupSelected;

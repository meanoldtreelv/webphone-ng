import React from "react";
import classes from "./signal.module.scss";

const Signal = () => {
	return (
		<div
			className={classes.signal}
			style={{ background: "var(--accent-blue-primary, #3B9EF7)", color: "var(--accent-green-label, #FFF)" }}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="2" fill="white" />
				<circle cx="12" cy="12" r="4" stroke="white" stroke-width="1.5" />
				<circle cx="12" cy="12" r="7" stroke="white" stroke-width="1.5" />
			</svg>
			<span className={`footnote_bold`}>Strong</span>
		</div>
	);
};

export default Signal;

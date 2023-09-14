import React from "react";
import classes from "./startConference.module.scss";

const StartConference = () => {
	return (
		<section className={classes.noContact}>
			<div className={classes.noContact_box}>
				<img src="/icon/no_contacts.svg" alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					Start or join a conference call
				</div>
				{/* <div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					When you have contacts you’ll see them here
				</div> */}

				<span className={`body_bold ${classes.button}`} style={{ color: "var(--text-on-color, #FFF)" }}>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path d="M9 3.75V14.25M3.75 9H14.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<span>Create Conference</span>
				</span>
			</div>
		</section>
	);
};

export default StartConference;

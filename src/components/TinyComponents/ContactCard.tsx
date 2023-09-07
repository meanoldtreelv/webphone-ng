import React from "react";
import classes from "./contactCard.module.scss";

const ContactCard = () => {
	return (
		<div className={classes.contact}>
			<span className={`sub_headline ${classes.contact_circle}`}>AA</span>
			<span className={classes.contact_name}>
				<span>Adam Arnold </span>
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="fill / suitcase">
						<g id="Vector">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M3.5 2.5C3.5 1.67157 4.17157 1 5 1H7C7.82843 1 8.5 1.67157 8.5 2.5H10C10.5523 2.5 11 2.94772 11 3.5V6.5C11 7.05228 10.5523 7.5 10 7.5H2C1.44772 7.5 1 7.05228 1 6.5V3.5C1 2.94772 1.44772 2.5 2 2.5H3.5ZM4.5 2.5C4.5 2.22386 4.72386 2 5 2H7C7.27614 2 7.5 2.22386 7.5 2.5H4.5Z"
								fill="#6C7A8B"
							/>
							<path
								d="M1.5 8.5H10.5V10C10.5 10.5523 10.0523 11 9.5 11H2.5C1.94772 11 1.5 10.5523 1.5 10V8.5Z"
								fill="#6C7A8B"
							/>
						</g>
					</g>
				</svg>
			</span>
		</div>
	);
};

export default ContactCard;

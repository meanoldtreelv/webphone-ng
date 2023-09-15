import React from "react";
import classes from "./noContact.module.scss";
import { useDispatch } from "react-redux";
import { contactActions } from "../../store/contact";

const NoContact = () => {
	const dispatch = useDispatch();

	return (
		<section className={classes.noContact}>
			<div className={classes.noContact_box}>
				<img src="/icon/no_contacts.svg" alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Contacts
				</div>
				<div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					When you have contacts you’ll see them here
				</div>

				<span
					className={`body_bold ${classes.button}`}
					style={{ color: "var(--text-on-color, #FFF)" }}
					onClick={() => {
						dispatch(contactActions.openAddContact());
					}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M12 15.75V14.25C12 13.4544 11.6839 12.6913 11.1213 12.1287C10.5587 11.5661 9.79565 11.25 9 11.25H4.5C3.70435 11.25 2.94129 11.5661 2.37868 12.1287C1.81607 12.6913 1.5 13.4544 1.5 14.25V15.75M14.25 6V10.5M16.5 8.25H12M9.75 5.25C9.75 6.90685 8.40685 8.25 6.75 8.25C5.09315 8.25 3.75 6.90685 3.75 5.25C3.75 3.59315 5.09315 2.25 6.75 2.25C8.40685 2.25 9.75 3.59315 9.75 5.25Z"
							stroke="white"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span>Add Contact</span>
				</span>
			</div>
		</section>
	);
};

export default NoContact;

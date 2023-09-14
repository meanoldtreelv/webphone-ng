import React from "react";
import classes from "./deleteContactPopUp.module.scss";
import { useDispatch } from "react-redux";
import { contactActions } from "../../store/contact";

const DeleteContactPopUp = () => {
	const dispatch = useDispatch();

	function deleteContactHandler() {
		dispatch(contactActions.closeDeleteContact());
	}
	return (
		<section className={classes.popUp}>
			<div className={classes.popUp_box}>
				<div className={classes.popUp_text}>
					<div className={`flex justify-center`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
								stroke="#6C7A8B"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<p className={`body_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
						Delete Contact
					</p>
					<p className={`footnote`} style={{ color: "var(--text-secondary, #5C6168)" }}>
						Are you sure that you want to delete contact ?
					</p>
				</div>
				<div className={classes.popUp_button}>
					<span
						className={`body`}
						style={{ color: "var(--text-primary, #1F2023)" }}
						onClick={() => {
							dispatch(contactActions.closeDeleteContact());
						}}>
						Cancel
					</span>
					<span
						className={`body_bold`}
						style={{
							color: "var(--text-on-color, #FFF)",
							background: "var(--support-danger, #EE3939)",
							border: "1px solid var(--support-danger, #EE3939)",
						}}
						onClick={deleteContactHandler}>
						Delete
					</span>
				</div>
			</div>
		</section>
	);
};

export default DeleteContactPopUp;

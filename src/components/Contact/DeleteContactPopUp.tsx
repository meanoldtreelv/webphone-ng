import React, { useEffect } from "react";
import classes from "./deleteContactPopUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "../../store/contact";
import { DELETE_Contact_API } from "../../effects/apiEffect";
import { log } from "console";

const DeleteContactPopUp = () => {
	const dispatch = useDispatch();
	const contactId = useSelector((state) => state.contact.deleteContactId);
	const contactLists = useSelector((state) => state.contact.contactList);
	console.log("====================================");
	console.log(contactId);
	console.log("====================================");

	function deleteContactHandler() {
		DELETE_Contact_API(
			contactId,
			(res: any) => {
				console.log(res, "contact delete API retrieve");
				if (res?.status === 204) {
					console.log("success in contact delete retrieve");
					dispatch(contactActions.closeDeleteContact());
					const filteredContact = filterAfterDeletedContact(contactLists, contactId);
					dispatch(contactActions.setContactList(filteredContact));
				}
			},
			(err: any) => {
				console.error(err, "err in contact delete retrieve");
			},
		);
	}

	// const idToDelete = "5e7b78c28c0f5dfdda5f53a7"; // Replace with the ID you want to delete

	// const updatedContactLists = contactLists.filter((item) => item.id !== idToDelete);

	// Print the updated array
	// console.log(updatedContactLists);

	function filterAfterDeletedContact(contactArray, contactIdToDelete) {
		const updatedContactLists = contactArray?.filter((item) => item?.id !== contactIdToDelete);
		return updatedContactLists;
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
					<p className={`body_bold`} style={{ color: "var(--text-primary, #1F2023)" }} onClick={deleteContactHandler}>
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

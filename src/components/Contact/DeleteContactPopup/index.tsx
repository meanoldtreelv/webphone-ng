import styles from "./DeleteContactPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteContact, setContactList } from "redux/contact/contactSlice";
import { DELETE_Contact_API } from "../../../effects/apiEffect";
import { log } from "console";
import InfoIcon from "components/UI/Icons/Info";

const DeleteContactPopUp = () => {
	const dispatch = useDispatch();
	const contactId = useSelector((state: any) => state.contact.deleteContactId);
	const contactLists = useSelector((state: any) => state.contact.contactList);

	const deleteContactHandler = () => {
		DELETE_Contact_API(
			contactId,
			(res: any) => {
				console.log(res, "contact delete API retrieve");
				if (res?.status === 204) {
					console.log("success in contact delete retrieve");
					dispatch(closeDeleteContact());
					const filteredContact = filterAfterDeletedContact(contactLists, contactId);
					dispatch(setContactList(filteredContact));
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

	const filterAfterDeletedContact = (contactArray: any, contactIdToDelete: any) => {
		const updatedContactLists = contactArray?.filter((item: any) => item?.id !== contactIdToDelete);
		return updatedContactLists;
	}

	return (
		<section className={styles.popUp}>
			<div className={styles.popUp_box}>
				<div className={styles.popUp_text}>
					<div className={`flex justify-center`}>
						<InfoIcon />
					</div>
					<p className={`body_bold`} style={{ color: "var(--text-primary, #1F2023)" }} onClick={deleteContactHandler}>
						Delete Contact
					</p>
					<p className={`footnote`} style={{ color: "var(--text-secondary, #5C6168)" }}>
						Are you sure that you want to delete contact ?
					</p>
				</div>
				<div className={styles.popUp_button}>
					<span
						className={`body`}
						style={{ color: "var(--text-primary, #1F2023)" }}
						onClick={() => {
							dispatch(closeDeleteContact());
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

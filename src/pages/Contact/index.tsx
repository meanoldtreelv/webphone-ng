import { useEffect } from "react";
import styles from "./Contact.module.scss";
import NoContact from "../../components/Contact/NoContact";
import NoContactSelected from "../../components/Contact/NoContactSelected";
import ContactList from "../../components/Contact/ContactList";
import AddEditContact from "../../components/Contact/AddEditContact";
import ContactDetails from "../../components/Contact/ContactDetails";
// import DeleteContactPopUp from "../../components/Contact/DeleteContactPopup"; // the code from here needs to be extracted and removed
import { useDispatch, useSelector } from "react-redux";
import {
	contactLists,
	addContactOpen,
	contactSelectd,
	deleteContactOpen,
	editContactNumber,
	selectedContactData,
} from "./../../redux/contact/contactSelectors";
import {
	clearSelectedContact,
	closeDeleteContact,
	closeSelectedContact,
	removeContact,
	setSelectedContact,
} from "redux/contact/contactSlice";
import BaseLayout from "../../layouts/BaseLayout";
import PromptDialog from "components/Modal/PromptDialog";
import { useLazyDeleteContactQuery } from "services/contact";

const Contact = () => {
	const dispatch = useDispatch();
	const isAddContactOpen = useSelector(addContactOpen);
	const contactNumber = useSelector(editContactNumber);
	const isContactSelected = useSelector(contactSelectd);
	const isDeleteContactOpen = useSelector(deleteContactOpen);
	const selectedContact = useSelector(selectedContactData);
	const [deleteContact, { isLoading }] = useLazyDeleteContactQuery();

	const deleteContactHandler = async () => {
		if (selectedContact) {
			await deleteContact(selectedContact.id);
			dispatch(clearSelectedContact());
			dispatch(removeContact(selectedContact.id));
		}
	};

	useEffect(() => {
		if (!isLoading) {
			dispatch(closeDeleteContact());
			dispatch(setSelectedContact(null));
			dispatch(closeSelectedContact());
		}
	}, [isLoading]);

	return (
		<div className={styles.contact}>
			<BaseLayout>
				{contactLists?.length > 0 ? (
					<section className={styles.contact_container}>
						<ContactList />
						{isContactSelected && selectedContact ? <ContactDetails /> : <NoContactSelected />}
					</section>
				) : (
					<NoContact />
				)}
			</BaseLayout>

			{(isAddContactOpen || contactNumber) && <AddEditContact />}

			{isDeleteContactOpen && (
				<PromptDialog
					type="warning"
					title="Delete Contact"
					actionBtnTxt="Delete"
					onClick={deleteContactHandler}
					loading={isLoading}>
					Are you sure that you want to delete a contact?
				</PromptDialog>
			)}
		</div>
	);
};

export default Contact;

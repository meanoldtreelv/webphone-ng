import { useEffect, useState } from "react";
import styles from "./Contact.module.scss";
import NoContact from "../../components/Contact/NoContact";
import NoContactSelected from "../../components/Contact/NoContactSelected";
import ContactList from "../../components/Contact/ContactList";
import AddEditContact from "../../components/Contact/AddEditContact";
import ContactDetails from "../../components/Contact/ContactDetails";
// import DeleteContactPopUp from "../../components/Contact/DeleteContactPopup"; // the code from here needs to be extracted and removed
import { useSelector } from "react-redux";
import {
	contactLists,
	addContactOpen,
	contactSelectd,
	deleteContactOpen,
	editContactNumber,
	selectedContactData,
} from "./../../redux/contact/contactSelectors";
import { setContactList } from "redux/contact/contactSlice";
import { GET_Contact_List_API } from "../../effects/apiEffect";
import BaseLayout from "../../layouts/BaseLayout";
import PromptDialog from "components/Modal/PromptDialog";
import { useLazyDeleteContactQuery } from "services/contact";

const Contact = () => {
	const [isContactLoaded, setIsContactLoaded] = useState(true);

	const isAddContactOpen = useSelector(addContactOpen);
	const contactNumber = useSelector(editContactNumber);
	const isContactSelected = useSelector(contactSelectd);
	const isDeleteContactOpen = useSelector(deleteContactOpen);
	const selectedContact = useSelector(selectedContactData);
	const [deleteContact] = useLazyDeleteContactQuery();

	const deleteContactHandler = () => {
		if(selectedContact) {
			deleteContact(selectedContact.id);
		}
	}

	useEffect(() => {
		GET_Contact_List_API(
			(res: any) => {
				console.log(res, "contact API retrieve");
				if (res?.status === 200) {
					console.log("success in contact retrieve");
					setContactList(res.data);
					// dispatch(setContactList(res?.data));
				}
			},
			(err: any) => {
				console.error(err, "err in contact retrieve");
			},
		);
	}, []);

	return (
		<div className={styles.contact}>
			<BaseLayout>
				{contactLists?.length > 0 ? (
					<section className={styles.contact_container}>
						<ContactList />
						{isContactSelected ? <ContactDetails /> : <NoContactSelected />}
					</section>
				) : (
					<NoContact />
				)}
			</BaseLayout>

			{(isAddContactOpen || contactNumber) && <AddEditContact />}

			{isDeleteContactOpen && (
				<PromptDialog type="warning" title="Delete Contact" actionBtnTxt="Delete" onClick={deleteContactHandler}>
					Are you sure that you want to delete a contact?
				</PromptDialog>
			)}
		</div>
	);
};

export default Contact;

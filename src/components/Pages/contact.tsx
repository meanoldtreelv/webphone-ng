import NoContact from "components/Contact/NoContact";
import NoContactSelected from "components/Contact/NoContactSelected";
import LayoutWrapper from "components/LayoutWrapper";
import ContactList from "components/Contact/ContactList";
import React, { useEffect, useState } from "react";
import classes from "./contact.module.scss";
import AddContact from "components/Contact/AddContact";
import ContactDetails from "components/Contact/ContactDetails";
import DeleteContactPopUp from "components/Contact/DeleteContactPopUp";

import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "../../store/contact";

import { GET_Contact_List_API } from "effects/apiEffect";

const Contact = () => {
	const [isContactLoaded, setIsContactLoaded] = useState(true);
	// const [isContactSelected, setIsContactSelected] = useState(false);

	const [contactList, setContactList] = useState(null);

	const isAddContactOpen = useSelector((state) => state.contact.addContactPopUpOpen);
	const isDeleteContactOpen = useSelector((state) => state.contact.deleteContactPopUpOpen);
	const isContactSelected = useSelector((state) => state.contact.selectedContactOpen);
	const isEditContactOpen = useSelector((state) => state.contact.editContact);

	const contactLists = useSelector((state) => state.contact.contactList);

	const dispatch = useDispatch();
	useEffect(() => {
		GET_Contact_List_API(
			(res: any) => {
				console.log(res, "contact API retrieve");
				if (res?.status === 200) {
					console.log("success in contact retrieve");
					setContactList(res.data);
					dispatch(contactActions.setContactList(res.data));
				}
			},
			(err: any) => {
				console.error(err, "err in contact retrieve");
			},
		);
	}, []);

	console.log("====================================");
	console.log(contactList);
	console.log("====================================");
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<LayoutWrapper>
				{contactLists?.length > 0 ? (
					<section className={`flex ${classes.contact_container}`}>
						<ContactList />
						{isContactSelected ? <ContactDetails /> : <NoContactSelected />}
					</section>
				) : (
					<NoContact />
				)}
			</LayoutWrapper>
			{(isAddContactOpen || isEditContactOpen) && <AddContact />}

			{isDeleteContactOpen && <DeleteContactPopUp />}
		</div>
	);
};

export default Contact;

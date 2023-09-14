import NoContact from "components/Contact/NoContact";
import NoContactSelected from "components/Contact/NoContactSelected";
import LayoutWrapper from "components/LayoutWrapper";
import ContactList from "components/Contact/ContactList";
import React, { useState } from "react";
import classes from "./contact.module.scss";
import AddContact from "components/Contact/AddContact";
import ContactDetails from "components/Contact/ContactDetails";
import DeleteContactPopUp from "components/Contact/DeleteContactPopUp";

import { useSelector } from "react-redux";

const Contact = () => {
	const [isContactLoaded, setIsContactLoaded] = useState(true);
	const [isContactSelected, setIsContactSelected] = useState(true);

	const isAddContactOpen = useSelector((state) => state.contact.addContactPopUpOpen);
	const isDeleteContactOpen = useSelector((state) => state.contact.deleteContactPopUpOpen);

	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<LayoutWrapper>
				{isContactLoaded ? (
					<section className={`flex ${classes.contact_container}`}>
						<ContactList />
						{isContactSelected ? <ContactDetails /> : <NoContactSelected />}
					</section>
				) : (
					<NoContact />
				)}
			</LayoutWrapper>
			{isAddContactOpen && <AddContact />}

			{isDeleteContactOpen && <DeleteContactPopUp />}
		</div>
	);
};

export default Contact;

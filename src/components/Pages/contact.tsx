import NoContact from "components/Contact/NoContact";
import NoContactSelected from "components/Contact/NoContactSelected";
import LayoutWrapper from "components/LayoutWrapper";
import ContactList from "components/shared/ContactList";
import React from "react";
import classes from "./contact.module.scss";
import AddContact from "components/Contact/AddContact";
import ContactDetails from "components/Contact/ContactDetails";
import DeleteContactPopUp from "components/Contact/DeleteContactPopUp";

const Contact = () => {
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<LayoutWrapper>
				{/* <NoContact /> */}
				<section className={`flex ${classes.contact_container}`}>
					<ContactList />
					{/* <NoContactSelected /> */}
					<ContactDetails />
				</section>
			</LayoutWrapper>
			{/* <AddContact /> */}
			{/* <DeleteContactPopUp /> */}
		</div>
	);
};

export default Contact;

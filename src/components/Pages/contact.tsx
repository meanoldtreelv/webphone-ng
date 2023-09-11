import NoContact from "components/Contact/NoContact";
import LayoutWrapper from "components/LayoutWrapper";
import ContactList from "components/shared/ContactList";
import React from "react";

const Contact = () => {
	return (
		<LayoutWrapper>
			{/* <NoContact /> */}
			<section>
				<ContactList />
			</section>
		</LayoutWrapper>
	);
};

export default Contact;

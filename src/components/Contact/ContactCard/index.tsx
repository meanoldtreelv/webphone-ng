import styles from "./ContactCard.module.scss";
import { useDispatch } from "react-redux";
import { setSelectedContact, openSelectedContact } from "redux/contact/contactSlice";
import { contactAbbreviation } from "../../../utils";
import SuitcaseIcon from "components/UI/Icons/Suitcase";

const ContactCard = ({ contactData }: any) => {
	const dispatch = useDispatch();

	return (
		<button
			className={styles.contact}
			onClick={() => {
				dispatch(setSelectedContact(contactData));
				dispatch(openSelectedContact());
			}}>
			<span className={`sub_headline ${styles.contact_circle}`}>
				{contactAbbreviation(contactData?.first_name, contactData?.last_name, contactData?.phone, contactData?.email)}
			</span>
			<span className={styles.contact_name}>
				<span>
					{contactData?.first_name + contactData?.last_name
						? contactData?.first_name + " " + contactData?.last_name
						: contactData?.phone || contactData?.email || contactData?.fax}
				</span>
				<SuitcaseIcon />
			</span>
		</button>
	);
};

export default ContactCard;

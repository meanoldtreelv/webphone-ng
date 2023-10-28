import React, { useEffect } from "react";
import styles from "./ContactCard.module.scss";
import { useDispatch } from "react-redux";
import { setSelectedContact, openSelectedContact } from "./../../../redux/contact/contactSlice";
import { contactAbbreviation } from "../../../utils";
import SuitcaseIcon from "./../../../components/UI/Icons/Suitcase";
import { IContactCard } from "./../../../constants/interfaces";

const ContactCard: React.FC<IContactCard> = ({ id, first_name, last_name, phone, email, fax, clicked }: any) => {
	return (
		<button className={styles.contact} onClick={clicked}>
			<span className={styles.contact_circle}>{contactAbbreviation(first_name, last_name, phone, email)}</span>
			<span className={styles.contact_name}>
				<span>{first_name + last_name ? first_name + " " + last_name : phone || email || fax}</span>
				<SuitcaseIcon />
			</span>
		</button>
	);
};

export default ContactCard;

import React from "react";
import styles from "./ContactProfile.module.scss";

const ContactProfile = ({ abbreviation }) => {
	return <span className={styles.profile}>{abbreviation}</span>;
};

export default ContactProfile;

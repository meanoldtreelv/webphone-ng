import styles from "./NoContact.module.scss";
import { useDispatch } from "react-redux";
import { openAddContact } from "redux/contact/contactSlice";

import noContactsImg from './../../../assets/images/icon/no_contacts.svg';
import UserAddIcon from "components/UI/Icons/User/UserAdd";

const NoContact = () => {
	const dispatch = useDispatch();

	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noContactsImg} alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Contacts
				</div>
				<div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					When you have contacts you'll see them here
				</div>
				
				<span
					className={`body_bold ${styles.button}`}
					style={{ color: "var(--text-on-color, #FFF)" }}
					onClick={() => {
						dispatch(openAddContact());
					}}>
					<UserAddIcon />
					<span>Add Contact</span>
				</span>
			</div>
		</section>
	);
};

export default NoContact;

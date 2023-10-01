import styles from "./NoContact.module.scss";
import { useDispatch } from "react-redux";
import { openAddEditContact } from "redux/contact/contactSlice";

import noContactsImg from "./../../../assets/images/icon/no_contacts.svg";
import UserAddIcon from "components/UI/Icons/User/UserAdd";

const NoContact = () => {
	const dispatch = useDispatch();

	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noContactsImg} alt="" />
				<h1>No Contacts</h1>
				<p>When you have contacts you'll see them here</p>

				<button
					className={styles.button}
					onClick={() => {
						dispatch(openAddEditContact());
					}}>
					<UserAddIcon />
					Add Contact
				</button>
			</div>
		</section>
	);
};

export default NoContact;

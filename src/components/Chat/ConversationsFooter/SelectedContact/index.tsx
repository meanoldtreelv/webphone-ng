import { contactAbbreviation } from "utils";
import styles from "./SelectedContact.module.scss";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import { selectedShareContact } from "redux/chat/chatSelectors";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedShareContact } from "redux/chat/chatSlice";

const SelectedContact = ({ data }) => {
	const dispatch = useDispatch();
	const selectedContact = useSelector(selectedShareContact);
	const first_name = data?.first_name;
	const last_name = data?.last_name;
	const phone = data?.phone;
	const email = data?.email;

	let firstName: string;
	let lastName: string;

	if (first_name === "undefine" || first_name === null) {
		firstName = "";
	} else {
		firstName = first_name;
	}

	if (last_name === "undefine" || last_name === null) {
		lastName = "";
	} else {
		lastName = last_name;
	}
	console.log(data, "data");

	const cancelContactHandler = () => {
		const filteredContact = selectedContact?.lists?.filter((item) => {
			if (item?.id !== data.id) {
				return item;
			}
		});

		dispatch(setSelectedShareContact({ ...selectedContact, lists: filteredContact }));
	};
	return (
		<div className={styles.selectedContact}>
			<p className={styles.initials}> {contactAbbreviation(first_name, last_name, phone, email)}</p>
			<b>{firstName + lastName ? firstName + " " + lastName : phone ? phone : email}</b>
			<span onClick={cancelContactHandler}>
				<CrossIcon color="icon-on-color" />
			</span>
		</div>
	);
};

export default SelectedContact;

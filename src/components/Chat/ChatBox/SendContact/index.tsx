import styles from "./SendContact.module.scss";
import ThreeDots from "components/UI/Icons/meet/ThreeDots";
import ContactDetailsPopUp from "../ContactDetailsPopup";
import { useState } from "react";
import SendTime from "../SendTime";
import { useDispatch, useSelector } from "react-redux";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import { setSelectedMsgLists } from "redux/chat/chatSlice";
import { contactAbbreviation } from "utils";

export const ContactSend = ({ item }) => {
	const [isContactMenuPopUpOpen, setIsContactMenuPopUpOpen] = useState(false);
	const first_name = item?.full_name?.first_name;
	const last_name = item?.full_name?.last_name;
	const phone = item?.phone_numbers?.[0];
	const email = item?.email;

	let firstName: string;
	let lastName: string;
	let number: any;

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
	if (phone === "undefine" || phone === null) {
		number = "";
	} else {
		number = phone;
	}
	return (
		<div className={styles.contact}>
			<div>
				<span className={styles.initials}>{contactAbbreviation(first_name, last_name, phone, "")}</span>
				<span className={styles.details}>
					<span className={styles.name}>{firstName + lastName ? firstName + " " + lastName : ""}</span>
					<span className={styles.number}>{number || email}</span>
				</span>
			</div>
			<span
				onClick={() => {
					setIsContactMenuPopUpOpen(!isContactMenuPopUpOpen);
				}}>
				<ThreeDots />
			</span>
			{isContactMenuPopUpOpen && <ContactDetailsPopUp />}
		</div>
	);
};

const SendContact = ({ id, files, time }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectedMsgList = useSelector(selectedMsgLists);

	const [isContactMenuPopUpOpen, setIsContactMenuPopUpOpen] = useState(false);

	// const first_name = files?.json_preview?.[0]?.full_name?.first_name;
	// const last_name = files?.json_preview?.[0]?.full_name?.last_name;
	// const phone = files?.json_preview?.[0]?.phone_numbers?.[0];

	// let firstName: string;
	// let lastName: string;

	// if (first_name === "undefine" || first_name === null) {
	// 	firstName = "";
	// } else {
	// 	firstName = first_name;
	// }

	// if (last_name === "undefine" || last_name === null) {
	// 	lastName = "";
	// } else {
	// 	lastName = last_name;
	// }

	const handleSelectInput = () => {
		!selectedMsgList.includes(id)
			? dispatch(setSelectedMsgLists({ type: "ADD", id }))
			: dispatch(setSelectedMsgLists({ id }));
	};
	return (
		<div className={`${styles.msgDiv} ${deleteCheck && styles.msgDiv_active}`}>
			<div className={styles.left}>
				<SendTime time={time} />

				<div className={styles.sendContact}>
					<div className={styles.contactBox}>
						{files?.json_preview?.map((item) => {
							// const first_name = item?.full_name?.first_name;
							// const last_name = item?.full_name?.last_name;
							// const phone = item?.phone_numbers?.[0];
							// const email = item?.email;

							// let firstName: string;
							// let lastName: string;
							// let number: any;

							// if (first_name === "undefine" || first_name === null) {
							// 	firstName = "";
							// } else {
							// 	firstName = first_name;
							// }

							// if (last_name === "undefine" || last_name === null) {
							// 	lastName = "";
							// } else {
							// 	lastName = last_name;
							// }
							// if (phone === "undefine" || phone === null) {
							// 	number = "";
							// } else {
							// 	number = phone;
							// }

							return (
								<ContactSend item={item} />
								// <div className={styles.contact}>
								// 	<div>
								// 		<span className={styles.initials}>{contactAbbreviation(first_name, last_name, phone, "")}</span>
								// 		<span className={styles.details}>
								// 			<span className={styles.name}>{firstName + lastName ? firstName + " " + lastName : ""}</span>
								// 			<span className={styles.number}>{number || email}</span>
								// 		</span>
								// 	</div>
								// 	<span
								// 		onClick={() => {
								// 			setIsContactMenuPopUpOpen(!isContactMenuPopUpOpen);
								// 		}}>
								// 		<ThreeDots />
								// 	</span>
								// 	{isContactMenuPopUpOpen && <ContactDetailsPopUp />}
								// </div>
							);
						})}
					</div>
				</div>
			</div>
			{deleteCheck && (
				<input type="checkbox" name="" id={id} checked={selectedMsgList.includes(id)} onChange={handleSelectInput} />
			)}
		</div>
	);
};

export default SendContact;

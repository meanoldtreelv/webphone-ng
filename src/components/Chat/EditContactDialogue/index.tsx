import BtnLarge from "components/UI/BtnLarge";
import styles from "./EditContactDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import CloseIcon from "components/UI/Icons/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { editContact } from "redux/chat/chatSelectors";
import { setIsEditContactDialogueOpen } from "redux/chat/chatSlice";
import { useLazyEditTextingContactQuery } from "services/chat";
import { showToast } from "utils";
import BtnMedium from "components/UI/BtnMedium";
import BtnAction from "components/UI/BtnAction";

const EditContactDialogue = () => {
	const dispatch = useDispatch();

	const editContacts = useSelector(editContact);

	const [editTextingContact, { isFetching: isFetching1 }] = useLazyEditTextingContactQuery();

	const [cancelHover, setCancelHover] = useState(false);
	const [firstName, setFirstName] = useState(editContacts?.first_name);
	const [lastName, setLastName] = useState(editContacts?.last_name);
	const [number, setNumber] = useState(editContacts?.number);

	const editContactHandler = async (e: any) => {
		e.preventDefault();

		if (!firstName && !lastName) return;

		const { data, error } = await editTextingContact({
			id: editContacts?.id,
			data: { first_name: firstName, last_name: lastName },
		});

		if (data) {
		}

		if (error) {
			showToast(error?.response.data.detail, "error");
		} else {
			dispatch(setIsEditContactDialogueOpen(false));
		}
	};

	return (
		<>
			<Backdrop />
			<form className={styles.dialogueBox} onSubmit={editContactHandler}>
				<h1 className={styles.topHeading}>
					<span>
						<EditIcon />
						<span>Edit Contact Info</span>
					</span>

					<BtnAction
						btnType={"normal"}
						isDisabled={false}
						type="button"
						isActive={false}
						onMouseOut={() => {
							setCancelHover(false);
						}}
						onMouseOver={() => {
							setCancelHover(true);
						}}
						onClick={() => {
							dispatch(setIsEditContactDialogueOpen(false));
						}}
						icon={<CloseIcon color={cancelHover ? "primary-default" : "icon-primary"} />}
					/>
					{/* <span
						className={styles.close}
						onClick={() => {
							dispatch(setIsEditContactDialogueOpen(false));
						}}>
						<CloseIcon />
					</span> */}
				</h1>

				<div className={styles.row}>
					<label htmlFor="firstName">First Name*</label>
					<input
						type="text"
						id="firstName"
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="lastName">Last Name*</label>
					<input
						type="text"
						id="lastName"
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="number">Number*</label>
					<input
						type="text"
						id="number"
						value={number}
						onChange={(e) => {
							setNumber(e.target.value);
						}}
						disabled
					/>
				</div>

				<div className={styles.btnBox}>
					<BtnMedium
						btnType={"primary"}
						isDanger={false}
						isDisabled={false}
						type="submit"
						btnText="Save"
						isLoading={isFetching1}
					/>
					{/* <button type="submit">Save {isFetching1 && <ClipLoader color="var(--text-on-color)" size={"14px"} />}</button> */}
				</div>
			</form>
		</>
	);
};

export default EditContactDialogue;

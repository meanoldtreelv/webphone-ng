import styles from "./AddContactDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import AddUserIcon from "components/UI/Icons/VideoCall/AddUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setIsAddContactDialogueOpen } from "redux/chat/chatSlice";
import { useLazyCreateTextingContactQuery } from "services/chat";
import { showToast } from "utils";

const AddContactDialogue = () => {
	const dispatch = useDispatch();

	const [createTextingContact, { isFetching: isFetching1 }] = useLazyCreateTextingContactQuery();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [number, setNumber] = useState("");
	const [error, setError] = useState("");

	const addContactHandler = async (e: any) => {
		e.preventDefault();
		setError("");
		if (!firstName && !lastName && !number) return;
		if (number.length < 2 && number?.length > 10) {
			setError("Invalid number format. Please enter a phone number in the format 1NPANXXXXXX.");
			return;
		}
		const { data, error } = await createTextingContact({
			first_name: firstName,
			last_name: lastName,
			number: number,
		});

		if (data) {
		}

		if (error) {
			console.log(error?.response.data.detail);

			showToast(error?.response.data.detail, "error");
		} else {
			dispatch(setIsAddContactDialogueOpen(false));
		}
	};
	return (
		<>
			<Backdrop />
			<form className={styles.dialogueBox} onSubmit={addContactHandler}>
				<h1 className={styles.topHeading}>
					<span>
						<AddUserIcon />
						<span>Add New Contact</span>
					</span>

					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsAddContactDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
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
						required
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
						required
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
						required
					/>
				</div>

				<div className={styles.btnBox}>
					<button type="submit">
						Add
						{isFetching1 && <ClipLoader color="var(--text-on-color)" size={"14px"} />}
					</button>
				</div>
				<p>{error}</p>
			</form>
		</>
	);
};

export default AddContactDialogue;

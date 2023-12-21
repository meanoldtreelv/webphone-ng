import styles from "./AddContactDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import BtnMedium from "components/UI/BtnMedium";
import CloseIcon from "components/UI/Icons/Close";
import AddUserIcon from "components/UI/Icons/VideoCall/AddUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsAddContactDialogueOpen } from "redux/chat/chatSlice";
import { useLazyCreateTextingContactQuery } from "services/chat";
import { showToast } from "utils";
import { ClipLoader } from "react-spinners";
import BtnLarge from "components/UI/BtnLarge";
import BtnAction from "components/UI/BtnAction";

const AddContactDialogue = () => {
	const dispatch = useDispatch();

	const [createTextingContact, { isFetching: isFetching1 }] = useLazyCreateTextingContactQuery();

	const [cancelHover, setCancelHover] = useState(false);
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
							dispatch(setIsAddContactDialogueOpen(false));
						}}
						icon={<CloseIcon color={cancelHover ? "primary-default" : "icon-primary"} />}
					/>

					{/* <span
						className={styles.close}
						onClick={() => {
							dispatch(setIsAddContactDialogueOpen(false));
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
					<BtnMedium
						btnType={"primary"}
						isDanger={false}
						isDisabled={false}
						type="submit"
						btnText="Add"
						icon={""}
						isLoading={isFetching1}
						// onClick={}
					/>
					{/* <button type="submit">
						Add
						{isFetching1 && <ClipLoader color="var(--text-on-color)" size={"14px"} />}
					</button> */}
				</div>
				<p>{error}</p>
			</form>
		</>
	);
};

export default AddContactDialogue;

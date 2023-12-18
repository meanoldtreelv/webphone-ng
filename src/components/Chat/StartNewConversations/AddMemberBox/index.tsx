import { useState } from "react";
import styles from "./AddMemberBox.module.scss";
import PlusIcon from "components/UI/Icons/Plus";
import { showToast } from "utils";
import { useLazyCreateTextingContactQuery } from "services/chat";
import { useDispatch, useSelector } from "react-redux";
import { setAddedMemberLists, setCampaignMemberLists, setIsAddMemberDialogueOpen } from "redux/chat/chatSlice";
import { addedMemberLists, campaignMemberLists, startConversationType } from "redux/chat/chatSelectors";
import BtnLarge from "components/UI/BtnLarge";

const AddMemberBox = ({ search }) => {
	const dispatch = useDispatch();

	const memberLists = useSelector(addedMemberLists);
	const campaignMemberList = useSelector(campaignMemberLists);
	const conversationType = useSelector(startConversationType);

	const [createTextingContact, { data, isLoading, isFetching }] = useLazyCreateTextingContactQuery();

	const [error, setError] = useState(false);

	const addMemberHandler = async () => {
		setError(false);
		if (search?.length < 10 || search?.length > 14) {
			setError(true);
			return;
		}

		const { error, data } = await createTextingContact({
			number: search,
		});

		if (data) {
			showToast("Contact saved successfully", "info");
			if (conversationType === "group") {
				const newMemberObject = { ...data, number: `+${search}` };
				dispatch(setAddedMemberLists([...memberLists, newMemberObject]));
				dispatch(setIsAddMemberDialogueOpen(false));
			}
			if (conversationType === "campaign") {
				const newMemberObject = { ...data, number: `+${search}` };
				dispatch(setCampaignMemberLists([...campaignMemberList, newMemberObject]));
				dispatch(setIsAddMemberDialogueOpen(false));
			}
		}
		if (error) {
			showToast("Error in saving contact", "error");
			return;
		}
	};

	return (
		<div className={styles.startConversation}>
			<div>Add this number to members list?</div>
			<p>{search}</p>
			<BtnLarge
				btnType={"primary"}
				isDanger={false}
				isDisabled={false}
				type="button"
				btnText="Add Member"
				icon={<PlusIcon color="icon-on-color" />}
				onClick={addMemberHandler}
			/>
			{/* <button onClick={addMemberHandler}>
				<PlusIcon color="icon-on-color" />
				<span>Add Member</span>
			</button> */}
			{error && (
				<p className={styles.err}>Invalid number format. Please enter a phone number in the format 1NPANXXXXXX.</p>
			)}
		</div>
	);
};

export default AddMemberBox;

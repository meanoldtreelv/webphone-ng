import { useState } from "react";
import styles from "./StartConversationBox.module.scss";
import ChatIcon from "components/UI/Icons/Chat";
import { useLazyCreateConversationObjectQuery, useLazyCreateTextingContactQuery } from "services/chat";
import { showToast } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { fromNumberSelected } from "redux/chat/chatSelectors";
import { setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";

const StartConversationBox = ({ search_no }) => {
	const dispatch = useDispatch();
	const selectedFromNumber = useSelector(fromNumberSelected);
	const [createTextingContact, { data, isLoading, isFetching }] = useLazyCreateTextingContactQuery();
	const [createConversationObject, {}] = useLazyCreateConversationObjectQuery();
	const [error, setError] = useState(false);

	const startConversationHandler = async () => {
		setError(false);
		if (search_no?.length < 10 || search_no?.length > 14) {
			setError(true);
			return;
		}

		const { error, data } = await createTextingContact({
			number: search_no,
		});

		if (data) {
			showToast("Contact saved successfully", "info");
		}
		if (error) {
			showToast("Error in saving contact", "error");
		}

		if (error) return;
		const { error: conversationError, data: conversationData } = await createConversationObject({
			recipients: [
				{
					number: search_no,
				},
			],
			from_number: selectedFromNumber,
			conversation_type: "direct",
		});

		if (conversationData) {
			showToast("Conversation object is created successfully", "info");
			dispatch(setIsStartNewConversationDialogueOpen(false));
		}
		if (conversationError) {
			showToast("Error in creating conversation object", "error");
		}
	};

	return (
		<div className={styles.startConversation}>
			<div>Start Conversation with this number?</div>
			<p>{search_no}</p>
			<button onClick={startConversationHandler}>
				<ChatIcon color="icon-on-color" />
				<span>Start Conversation</span>
			</button>
			{error && <p className={styles.err}>Contact number should be 10 to 11 digit long</p>}
		</div>
	);
};

export default StartConversationBox;

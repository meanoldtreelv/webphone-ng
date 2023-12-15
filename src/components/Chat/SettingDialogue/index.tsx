import styles from "./SettingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import MessageIcon from "components/UI/Icons/Sidecar/Message";
import CloseIcon from "components/UI/Icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { setConversationData, setConversationLists, setIsSettingDialogueOpen } from "redux/chat/chatSlice";
import { conversationData, conversationLists, fromContactLists } from "redux/chat/chatSelectors";
import { useState } from "react";
import { showToast } from "utils";
import { useLazyCreateConversationObjectQuery, useLazyGetConversationListsQuery } from "services/chat";

const SettingDialogue = () => {
	const dispatch = useDispatch();

	const fromContactList = useSelector(fromContactLists);
	const conversationDatas = useSelector(conversationData);
	const conversationsList = useSelector(conversationLists);

	const [getConversationLists] = useLazyGetConversationListsQuery();
	const [createConversationObject, {}] = useLazyCreateConversationObjectQuery();

	const [fromNumber, setFromNumber] = useState(conversationDatas?.from_number);

	const setNumberHandler = async () => {
		if (fromNumber === conversationDatas?.from_number) {
			showToast("You are texting with same number ", "info");
			return;
		}

		const query = {
			contact_id: conversationDatas?.contactsinfo?.[0]?.id,
			from_numbers: [fromNumber],
		};
		const strQuery = new URLSearchParams(query);

		const { data, error } = await getConversationLists(strQuery);

		if (data) {
			if (conversationDatas?.conversation_type === "direct") {
				const filteredList = data?.filter((item) => {
					return item.conversation_type === "direct";
				});

				if (filteredList.length === 0) {
					//create a conversation object
					const { error: conversationError, data: conversationData } = await createConversationObject({
						recipients: [
							{
								number: conversationDatas?.contactsinfo?.[0]?.number,
							},
						],
						from_number: fromNumber,
						conversation_type: "direct",
					});

					if (conversationData) {
						showToast("Conversation object is created successfully", "info");
						dispatch(setIsSettingDialogueOpen(false));
						// dispatch(setIsStartNewConversationDialogueOpen(false));
					}
					if (conversationError) {
						showToast("Error in creating conversation object", "error");
					}
				} else {
					//search the conversation object in the conversation list fetch,
					//if found push it to top of the list and if not found then also push it top
					// const searchFromConversationLists = conversationsList?.filter((item) => {
					// 	return item.id === filteredList?.[0]?.id;
					// });
					// Search the conversation object in the conversation list
					const conversationId = filteredList[0].id;
					const conversationIndex = conversationsList.findIndex((item) => item.id === conversationId);
					// console.log(conversationIndex);

					if (conversationIndex !== -1) {
						// If conversation found, remove it from its current position and push it to the top
						const conversationList = [...conversationsList];
						const conversation = conversationList.splice(conversationIndex, 1)[0];
						conversationList.unshift(conversation); // Push to the top
						dispatch(setConversationLists(conversationList));
						dispatch(setConversationData(conversation));
						dispatch(setIsSettingDialogueOpen(false));
					} else {
						const conversationList = conversationsList;
						conversationList.unshift(filteredList?.[0]);
						dispatch(setConversationLists(conversationList));
						dispatch(setConversationData(filteredList?.[0]));
						dispatch(setIsSettingDialogueOpen(false));

						// If conversation not found, create a new conversation object and push it to the top
						// Your code to create a new conversation object goes here
						// Then add it to the top of the list
						// conversationsList.unshift(newConversation);
					}
				}
			}
			if (conversationDatas?.conversation_type === "campaign") {
				const contactArray = conversationDatas?.contactsinfo.map((item) => {
					return { number: item.number };
				});

				const { error: conversationError, data: conversationData } = await createConversationObject({
					recipients: contactArray,
					from_number: fromNumber,
					conversation_type: "campaign",
					name: conversationDatas?.campaign_info?.name,
				});

				if (conversationData) {
					showToast("Conversation object is created successfully", "info");
					dispatch(setConversationData(conversationData));
					dispatch(setIsSettingDialogueOpen(false));
				}
				if (conversationError) {
					showToast("Error in creating conversation object", "error");
				}

				// const filteredList = data?.filter((item) => {
				// 	return item.conversation_type === "campaign";
				// });

				// if (filteredList.length === 0) {
				// 	//create a conversation object
				// 	const { error: conversationError, data: conversationData } = await createConversationObject({
				// 		recipients: [
				// 			// todo - create all the number array here
				// 			{
				// 				number: conversationDatas?.contactsinfo?.[0]?.number,
				// 			},
				// 		],
				// 		from_number: fromNumber,
				// 		conversation_type: "campaign",
				// 	});

				// 	if (conversationData) {
				// 		showToast("Conversation object is created successfully", "info");
				// 		dispatch(setIsSettingDialogueOpen(false));
				// 		// dispatch(setIsStartNewConversationDialogueOpen(false));
				// 	}
				// 	if (conversationError) {
				// 		showToast("Error in creating conversation object", "error");
				// 	}
				// } else {
				// 	// const contactArray = conversationDatas?.contactsinfo.map((item) => {
				// 	// 	return { number: item.number };
				// 	// });
				// }
			}
			if (conversationDatas?.conversation_type === "group") {
				const contactArray = conversationDatas?.contactsinfo.map((item) => {
					return { number: item.number };
				});

				const { error: conversationError, data: conversationData } = await createConversationObject({
					recipients: contactArray,
					from_number: fromNumber,
					conversation_type: "group",
					name: conversationDatas?.campaign_info?.name,
				});

				if (conversationData) {
					showToast("Conversation object is created successfully", "info");
					dispatch(setConversationData(conversationData));
					dispatch(setIsSettingDialogueOpen(false));
				}

				if (conversationError) {
					showToast("Error in creating conversation object", "error");
				}
			}
		}
	};

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<MessageIcon />
						<span>Choose your number</span>
					</span>

					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsSettingDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</h1>

				<p>Choose main number for sending messages</p>

				<div className={styles.row}>
					<label htmlFor="fromNumber">Your Numbers </label>
					<select
						name=""
						id="fromNumber"
						onChange={(e) => {
							setFromNumber(e.target.value);
						}}>
						{fromContactList?.map((item) => (
							<option value={item?.number} key={item.id} selected={item?.number === conversationDatas?.from_number}>
								{item?.number}
							</option>
						))}
					</select>
				</div>

				<div className={styles.btnBox}>
					<button
						onClick={setNumberHandler}
						className={`${styles.button} ${fromNumber === conversationDatas?.from_number ? styles.buttonActive : ""}`}>
						Set
					</button>
				</div>
			</div>
		</>
	);
};

export default SettingDialogue;

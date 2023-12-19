import { useEffect } from "react";
import styles from "./StartNewConversations.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import Conversations from "./Conversations";
import Group from "./Group";
import { useDispatch, useSelector } from "react-redux";
import {
	setFromContactLists,
	setFromNumberSelected,
	setIsStartNewConversationDialogueOpen,
	setStartConversationType,
} from "redux/chat/chatSlice";
import { useLazyGetTextingNumbersQuery } from "services/chat";
import { showToast } from "utils";
import Campaign from "./Campaign";
import { startConversationType } from "redux/chat/chatSelectors";

const StartNewConversations = () => {
	const dispatch = useDispatch();

	const conversationType = useSelector(startConversationType);

	const [getTextingNumber, { data, isLoading, isFetching }] = useLazyGetTextingNumbersQuery();

	useEffect(() => {
		const fetchData = async () => {
			const { error, data } = await getTextingNumber("");

			if (data) {
				dispatch(setFromContactLists(data));
				dispatch(setFromNumberSelected(data[0].number));
			}

			if (error) {
				showToast("There is error in fetching From Contact Lists, please try again later  ", "error");
			}
		};

		fetchData();
	}, []);

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Start New Conversation</span>
					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsStartNewConversationDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>
				<div className={styles.tabBar}>
					<span
						className={`${conversationType === "conversations" ? styles.active : ""}`}
						onClick={() => {
							dispatch(setStartConversationType("conversations"));
						}}>
						Conversation
					</span>
					<span
						className={`${conversationType === "group" ? styles.active : ""}`}
						onClick={() => {
							dispatch(setStartConversationType("group"));
						}}>
						Group
					</span>
					<span
						className={`${conversationType === "campaign" ? styles.active : ""}`}
						onClick={() => {
							dispatch(setStartConversationType("campaign"));
						}}>
						Campaign
					</span>
				</div>
				{conversationType === "conversations" && <Conversations />}
				{conversationType === "group" && <Group />}
				{conversationType === "campaign" && <Campaign />}
			</div>
		</div>
	);
};

export default StartNewConversations;

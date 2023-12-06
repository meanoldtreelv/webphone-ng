import { useEffect, useState } from "react";
import styles from "./StartNewConversations.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import Conversations from "./Conversations";
import Group from "./Group";
import { useDispatch } from "react-redux";
import {
	setFromContactLists,
	setFromNumberSelected,
	setIsStartNewConversationDialogueOpen,
} from "redux/chat/chatSlice";
import { useLazyGetTextingNumbersQuery } from "services/chat";
import { showToast } from "utils";

const StartNewConversations = () => {
	const dispatch = useDispatch();

	const [getTextingNumber, { data, isLoading, isFetching }] = useLazyGetTextingNumbersQuery();

	const [tabActive, setTabActive] = useState("conversations");

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
						className={`${tabActive === "conversations" ? styles.active : ""}`}
						onClick={() => {
							setTabActive("conversations");
						}}>
						Conversation
					</span>
					<span
						className={`${tabActive === "group" ? styles.active : ""}`}
						onClick={() => {
							setTabActive("group");
						}}>
						Group
					</span>
					<span
						className={`${tabActive === "campaign" ? styles.active : ""}`}
						onClick={() => {
							setTabActive("campaign");
						}}>
						Campaign
					</span>
				</div>
				{tabActive === "conversations" && <Conversations />}
				{tabActive === "group" && <Group />}
			</div>
		</div>
	);
};

export default StartNewConversations;

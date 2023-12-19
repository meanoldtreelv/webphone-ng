import { useDispatch, useSelector } from "react-redux";
import styles from "./SelectedMsgControl.module.scss";
import { setIsDeleteCheck, setMsgLists, setSelectAllMsg, setSelectedMsgLists } from "redux/chat/chatSlice";
import { conversationData, msgLists, selectAllMsg, selectedMsgLists } from "redux/chat/chatSelectors";
import { useLazyDeleteMessagesQuery } from "services/chat";
import { ClipLoader } from "react-spinners";
import { showToast } from "utils";

const SelectedMsgControl = () => {
	const dispatch = useDispatch();

	const selectedMsgList = useSelector(selectedMsgLists);
	const selectAllMsgs = useSelector(selectAllMsg);
	const conversationsData = useSelector(conversationData);
	const messageLists = useSelector(msgLists);

	const [deleteMessages, { isLoading: isLoading1 }] = useLazyDeleteMessagesQuery();

	const deleteStrQueries = new URLSearchParams({
		ids: selectedMsgList,
	}).toString();

	const deleteHandler = async () => {
		if (selectedMsgList.length === 0) return;

		const { error, data } = await deleteMessages({
			conversation_id: conversationsData?.id,
			message_id_list: deleteStrQueries,
		});

		if (error) {
			showToast("some thing went wrong", "error");
		} else {
			// filter out msg which is deleted
			const list = [...messageLists];
			const idLists = [...selectedMsgList];
			const filteredMessages = list.filter((item) => !idLists.includes(item.id));
			dispatch(setMsgLists(filteredMessages));
			dispatch(setIsDeleteCheck(false));
			showToast("Message deleted successfully", "success");
		}
	};

	const selectAllHandler = () => {
		dispatch(setSelectAllMsg(!selectAllMsgs));
		if (selectedMsgList.length === messageLists.length) {
			dispatch(setSelectedMsgLists({ type: "RESET" }));
		} else {
			const list = [...messageLists];
			const updatedList = list.map((item) => {
				return item.id;
			});

			dispatch(setSelectedMsgLists({ type: "SELECT_ALL", idLists: updatedList }));
		}
	};

	return (
		<div className={styles.controlBar}>
			<div>
				<button
					className={styles.cancel}
					onClick={() => {
						dispatch(setIsDeleteCheck(false));
					}}>
					Cancel
				</button>
				<button className={styles.delete} onClick={deleteHandler}>
					Delete {isLoading1 && <ClipLoader size={12} color="var(--text-on-color)" />}
				</button>
			</div>
			<div>
				<span>({selectedMsgList.length}) messages were selected</span>
				<button className={styles.info} onClick={selectAllHandler}>
					Select All
				</button>
			</div>
		</div>
	);
};

export default SelectedMsgControl;

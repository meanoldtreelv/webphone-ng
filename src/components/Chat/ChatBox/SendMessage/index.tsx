import { useDispatch, useSelector } from "react-redux";
import SendTime from "../SendTime";
import styles from "./SendMessage.module.scss";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import { setSelectedMsgLists } from "redux/chat/chatSlice";

const SendMessage = ({ id, text, time }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectedMsgList = useSelector(selectedMsgLists);

	const handleSelectInput = () => {
		!selectedMsgList.includes(id)
			? dispatch(setSelectedMsgLists({ type: "ADD", id }))
			: dispatch(setSelectedMsgLists({ id }));
	};

	return (
		<div className={`${styles.msgDiv} ${deleteCheck && styles.msgDiv_active}`}>
			<div className={styles.left}>
				<SendTime time={time} />
				<div className={styles.sendChat}>
					<span> {text}</span>
				</div>
			</div>
			{deleteCheck && (
				<input type="checkbox" name="" id={id} checked={selectedMsgList.includes(id)} onChange={handleSelectInput} />
			)}
		</div>
	);
};

export default SendMessage;

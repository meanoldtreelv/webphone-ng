import { useDispatch, useSelector } from "react-redux";
import SendTime from "../SendTime";
import styles from "./SendMessage.module.scss";
import { isDeleteCheck, selectAllMsg, selectedMsgLists } from "redux/chat/chatSelectors";
import { useState } from "react";
import { setSelectedMsgLists } from "redux/chat/chatSlice";

const SendMessage = ({ id, text, time }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectAllMsgs = useSelector(selectAllMsg);
	const selectedMsgList = useSelector(selectedMsgLists);

	// const [value, setValue] = useState("");

	// console.log(value, "value");

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
				<input
					type="checkbox"
					name=""
					id={id}
					checked={selectedMsgList.includes(id)}
					// checked={seletAllMsgs}
					// value={value}
					onChange={handleSelectInput}
				/>
			)}
		</div>
	);
};

export default SendMessage;

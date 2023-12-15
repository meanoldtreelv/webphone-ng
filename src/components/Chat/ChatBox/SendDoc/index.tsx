import styles from "./SendDoc.module.scss";
import DocImg from "../../../../assets/images/img/doc.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsDocumentViewerDialogueOpen, setSelectedMsgLists } from "redux/chat/chatSlice";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import SendTime from "../SendTime";

const SendDoc = ({ id, time, name, files, size }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectedMsgList = useSelector(selectedMsgLists);

	const handleSelectInput = () => {
		!selectedMsgList.includes(id)
			? dispatch(setSelectedMsgLists({ type: "ADD", id }))
			: dispatch(setSelectedMsgLists({ id }));
	};
	return (
		<>
			<div className={`${styles.msgDiv} ${deleteCheck && styles.msgDiv_active}`}>
				<div className={styles.left}>
					<SendTime time={time} />

					<div className={styles.sendDoc}>
						<div
							onClick={() => {
								dispatch(setIsDocumentViewerDialogueOpen(true));
							}}>
							<span>
								<img src={DocImg} alt="" />
							</span>
							<span className={styles.details}>
								<span>{name}</span>
								<b>{size} kb</b>
							</span>
						</div>
					</div>
				</div>
				{deleteCheck && (
					<input type="checkbox" name="" id={id} checked={selectedMsgList.includes(id)} onChange={handleSelectInput} />
				)}
			</div>
		</>
	);
};

export default SendDoc;

import { useDispatch, useSelector } from "react-redux";
import styles from "./ReceiveImg.module.scss";
import { setImageFiles, setIsImgViewerDialogueOpen, setSelectedMsgLists } from "redux/chat/chatSlice";
import ReceiveTime from "../ReceiveTime";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";

const ReceiveImg = ({ id, time, src, files }) => {
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
				<ReceiveTime time={time} />
				<div className={styles.receiveImg}>
					<span
						onClick={() => {
							dispatch(setIsImgViewerDialogueOpen(true));
							dispatch(setImageFiles(files));
						}}>
						<img src={src} alt="" />
					</span>
				</div>
			</div>
			{deleteCheck && (
				<input
					type="checkbox"
					name=""
					id={id}
					checked={selectedMsgList.includes(id)}
					// value={value}
					onChange={handleSelectInput}
				/>
			)}
		</div>
	);
};

export default ReceiveImg;

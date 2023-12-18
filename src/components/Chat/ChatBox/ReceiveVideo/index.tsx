import { useDispatch, useSelector } from "react-redux";
import styles from "./ReceiveVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import { setIsVideoViewerDialogueOpen, setSelectedFiles, setSelectedMsgLists } from "redux/chat/chatSlice";
import ReceiveTime from "../ReceiveTime";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import { formatTime } from "helpers/formatDateTime";

const ReceiveVideo = ({ id, time, src, duration, files }) => {
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
				<div className={styles.receiveVideo}>
					<span
						onClick={() => {
							dispatch(setIsVideoViewerDialogueOpen(true));
							dispatch(setSelectedFiles(files));
						}}>
						<img src={src} alt="" />
						<span className={styles.btnPlay}>
							<BtnPlay />
						</span>
						<span className={styles.duration}>{formatTime(duration)}</span>
					</span>
				</div>
			</div>
			{deleteCheck && (
				<input type="checkbox" name="" id={id} checked={selectedMsgList.includes(id)} onChange={handleSelectInput} />
			)}
		</div>
	);
};

export default ReceiveVideo;

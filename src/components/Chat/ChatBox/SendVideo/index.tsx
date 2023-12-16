import { useDispatch, useSelector } from "react-redux";
import styles from "./SendVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import { setIsVideoViewerDialogueOpen, setSelectedMsgLists } from "redux/chat/chatSlice";
import SendTime from "../SendTime";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";

const SendVideo = ({ id, time, src, duration, files }) => {
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
					<div className={styles.sendVideo}>
						<span
							onClick={() => {
								dispatch(setIsVideoViewerDialogueOpen(true));
								// dispatch(setImageFiles(files));
							}}>
							<img src={src} alt="" />
							<span className={styles.btnPlay}>
								<BtnPlay color="icon-on-color" />
							</span>
							<span className={styles.duration}>{duration}</span>
						</span>
					</div>
				</div>
				{deleteCheck && (
					<input type="checkbox" name="" id={id} checked={selectedMsgList.includes(id)} onChange={handleSelectInput} />
				)}
			</div>
		</>
	);
};

export default SendVideo;

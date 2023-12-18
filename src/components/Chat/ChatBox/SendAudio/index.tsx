import styles from "./SendAudio.module.scss";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import SoundWaves2 from "../../../../assets/images/img/sound_wave_send.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsAudioViewerDialogueOpen, setSelectedFiles, setSelectedMsgLists } from "redux/chat/chatSlice";
import SendTime from "../SendTime";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import { formatTime } from "helpers/formatDateTime";

const SendAudio = ({ id, time, name, files, duration }) => {
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

					<div className={styles.sendAudio}>
						<div
							className={styles.audio}
							onClick={() => {
								dispatch(setIsAudioViewerDialogueOpen(true));
								dispatch(setSelectedFiles(files));
							}}>
							<PlayerPlay color="icon-on-color" />
							<div>
								<img src={SoundWaves2} alt="" />
								<span className={styles.soundDetails}>
									<span>{name}</span>
									<span className={styles.duration}>{formatTime(duration)}</span>
								</span>
							</div>
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

export default SendAudio;

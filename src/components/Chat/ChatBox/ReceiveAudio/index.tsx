import styles from "./ReceiveAudio.module.scss";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import SoundWaves1 from "../../../../assets/images/img/sound_wave_receive.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsAudioViewerDialogueOpen, setSelectedMsgLists } from "redux/chat/chatSlice";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import ReceiveTime from "../ReceiveTime";

const ReceiveAudio = ({ id, time, files, name, duration }) => {
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
					<ReceiveTime time={time} />
					<div className={styles.receiveAudio}>
						<div
							className={styles.audio}
							onClick={() => {
								dispatch(setIsAudioViewerDialogueOpen(true));
							}}>
							<PlayerPlay color="primary-default" />
							<div>
								<img src={SoundWaves1} alt="" />
								<span className={styles.soundDetails}>
									<span>{name}</span>
									<span className={styles.duration}>{duration}</span>
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

export default ReceiveAudio;

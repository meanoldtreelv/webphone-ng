import styles from "./SendAudio.module.scss";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import SoundWaves2 from "../../../../assets/images/img/sound_wave_send.svg";
import { useDispatch } from "react-redux";
import { setIsAudioViewerDialogueOpen } from "redux/chat/chatSlice";

const SendAudio = () => {
	const dispatch = useDispatch();
	return (
		<div
			className={styles.sendAudio}
			onClick={() => {
				dispatch(setIsAudioViewerDialogueOpen(true));
			}}>
			<div className={styles.audio}>
				<PlayerPlay color="icon-on-color" />
				<div>
					<img src={SoundWaves2} alt="" />
					<span className={styles.soundDetails}>
						<span>Call record 2402.wav</span>
						<span className={styles.duration}>01:30</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SendAudio;

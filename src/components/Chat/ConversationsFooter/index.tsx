import { useState } from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import SelectedImg from "./SelectedImg";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import SelectedVideo from "./SelectedVideo";
import MusicIcon from "components/UI/Icons/ChatIcons/Music";
import SelectedAudio from "./SelectedAudio";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";

const ConversationsFooter = () => {
	const [sendActive, setSendActive] = useState(true);

	return (
		<>
			<div className={styles.footer}>
				<div className={styles.audioPlaying}>
					<div>
						<span>
							<PlayerPause color="default-primary" />
						</span>
						<b>Call record 2402.wav</b>
					</div>
					<div>
						<b>02:30</b>
						<span>
							<CloseIcon />
						</span>
					</div>
				</div>
				<div className={styles.top}>
					<span onClick={() => {}} className={styles.attachment}>
						<AttachmentIcon />
					</span>
					<div className={styles.inputBox}>
						<input placeholder="Enter your message" />
						<span className={styles.icon}>
							<MicrophoneIcon />
						</span>
					</div>
					<div className={`${styles.send} ${sendActive ? styles.send_active : ""}`}>
						<AirplaneIcon />
					</div>
				</div>
				<div className={styles.bottom}>
					{/* If img or video selected please dispatch an boolean action for padding bottom to chatBox */}
					<SelectedImg />
					<SelectedVideo />
					<SelectedAudio />
					{/* please don't use this component.this is for testing only, use the above component */}
					<div className={styles.selectedImg}>
						<img src="/img/dummy/photo.jpg" alt="" />
						<span>
							<CrossIcon />
						</span>
					</div>
					<div className={styles.selectedImg}>
						<img src="/img/dummy/dummy_video.png" alt="" />
						<span>
							<CrossIcon />
						</span>
					</div>

					<div className={styles.selectedVideo}>
						<img src="/img/dummy/dummy_video.png" alt="" />
						<span className={styles.close}>
							<CrossIcon />
						</span>
						<span className={styles.btnPlay}>
							<BtnPlay />
						</span>
					</div>
					<div className={styles.selectedAudio}>
						<MusicIcon />
						<b>Call record 1309.wav</b>
						<span>
							<CrossIcon />
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConversationsFooter;

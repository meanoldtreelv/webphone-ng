import { useState } from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import SelectedImg from "./SelectedImg";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import SelectedVideo from "./SelectedVideo";

const ConversationsFooter = () => {
	const [sendActive, setSendActive] = useState(true);

	return (
		<div className={styles.footer}>
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
			</div>
		</div>
	);
};

export default ConversationsFooter;

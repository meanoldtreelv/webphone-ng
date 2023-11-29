import styles from "./ReceiveVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";

const ReceiveVideo = () => {
	return (
		<div className={styles.receiveVideo}>
			<span>
				<img src="/img/dummy/dummy_video.png" alt="" />
				<span className={styles.btnPlay}>
					<BtnPlay />
				</span>
				<span className={styles.duration}>01:30</span>
			</span>
		</div>
	);
};

export default ReceiveVideo;

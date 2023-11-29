import styles from "./SendVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";

const SendVideo = () => {
	return (
		<div className={styles.sendVideo}>
			<span>
				<img src="/img/dummy/profile.png" alt="" />
				<span className={styles.btnPlay}>
					<BtnPlay />
				</span>
				<span className={styles.duration}>01:30</span>
			</span>
		</div>
	);
};

export default SendVideo;

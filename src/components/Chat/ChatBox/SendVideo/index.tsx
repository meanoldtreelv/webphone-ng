import { useDispatch } from "react-redux";
import styles from "./SendVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import { setIsVideoViewerDialogueOpen } from "redux/chat/chatSlice";

const SendVideo = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.sendVideo}>
			<span
				onClick={() => {
					dispatch(setIsVideoViewerDialogueOpen(true));
				}}>
				<img src="/img/dummy/profile.png" alt="" />
				<span className={styles.btnPlay}>
					<BtnPlay color="icon-on-color" />
				</span>
				<span className={styles.duration}>01:30</span>
			</span>
		</div>
	);
};

export default SendVideo;

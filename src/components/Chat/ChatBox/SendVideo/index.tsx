import { useDispatch } from "react-redux";
import styles from "./SendVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import { setIsVideoViewerDialogueOpen } from "redux/chat/chatSlice";

const SendVideo = () => {
	const dispatch = useDispatch();
	return (
		<div
			className={styles.sendVideo}
			onClick={() => {
				dispatch(setIsVideoViewerDialogueOpen(true));
			}}>
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

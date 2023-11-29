import { useDispatch } from "react-redux";
import styles from "./ReceiveVideo.module.scss";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import { setIsVideoViewerDialogueOpen } from "redux/chat/chatSlice";

const ReceiveVideo = () => {
	const dispatch = useDispatch();
	return (
		<div
			className={styles.receiveVideo}
			onClick={() => {
				dispatch(setIsVideoViewerDialogueOpen(true));
			}}>
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

import { useDispatch } from "react-redux";
import styles from "./SendImg.module.scss";
import { setIsImgViewerDialogueOpen } from "redux/chat/chatSlice";

const SendImg = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.sendImg}>
			<span
				onClick={() => {
					dispatch(setIsImgViewerDialogueOpen(true));
				}}>
				<img src="/img/dummy/video_call.jpeg" alt=""></img>
			</span>
		</div>
	);
};

export default SendImg;

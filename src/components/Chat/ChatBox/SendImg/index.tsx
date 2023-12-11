import { useDispatch } from "react-redux";
import styles from "./SendImg.module.scss";
import { setIsImgViewerDialogueOpen } from "redux/chat/chatSlice";

const SendImg = ({ src }) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.sendImg}>
			<span
				onClick={() => {
					dispatch(setIsImgViewerDialogueOpen(true));
				}}>
				<img src={src} alt=""></img>
			</span>
		</div>
	);
};

export default SendImg;

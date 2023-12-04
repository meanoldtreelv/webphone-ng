import { useDispatch } from "react-redux";
import styles from "./ReceiveImg.module.scss";
import { setIsImgViewerDialogueOpen } from "redux/chat/chatSlice";

const ReceiveImg = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.receiveImg}>
			<span
				onClick={() => {
					dispatch(setIsImgViewerDialogueOpen(true));
				}}>
				<img src="/img/dummy/profile.png" alt="" />
			</span>
		</div>
	);
};

export default ReceiveImg;

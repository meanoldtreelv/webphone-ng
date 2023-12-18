import styles from "./SelectedVideo.module.scss";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import { useDispatch, useSelector } from "react-redux";
import { selectedAttachment, selectedFiles } from "redux/chat/chatSelectors";
import { setSelectedAttachment } from "redux/chat/chatSlice";

const SelectedVideo = ({ src, name }) => {
	const dispatch = useDispatch();

	const selectedFile = useSelector(selectedAttachment);

	const cancelHandler = () => {
		const files = [...selectedFile];
		const filteredFiles = files?.filter((item) => {
			return item.name !== name;
		});
		dispatch(setSelectedAttachment(filteredFiles));
	};

	return (
		<div className={styles.selectedVideo}>
			{/* <img src={src} alt="" /> */}
			<video src={src}></video>
			<span className={styles.close} onClick={cancelHandler}>
				<CrossIcon color="icon-on-color" />
			</span>
			<span className={styles.btnPlay}>
				<BtnPlay />
			</span>
		</div>
	);
};

export default SelectedVideo;

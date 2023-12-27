import styles from "./SelectedAudio.module.scss";
import MusicIcon from "components/UI/Icons/ChatIcons/Music";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import { useDispatch, useSelector } from "react-redux";
import { selectedAttachment } from "redux/chat/chatSelectors";
import { setSelectedAttachment } from "redux/chat/chatSlice";

const SelectedAudio = ({ name }) => {
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
		<div className={styles.selectedAudio}>
			<MusicIcon />
			<b>{name}</b>
			<span onClick={cancelHandler}>
				<CrossIcon color="icon-on-color" />
			</span>
		</div>
	);
};

export default SelectedAudio;

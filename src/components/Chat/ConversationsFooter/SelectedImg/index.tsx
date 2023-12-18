import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import styles from "./SelectedImg.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectedAttachment, selectedFiles } from "redux/chat/chatSelectors";
import { setSelectedAttachment, setSelectedFiles } from "redux/chat/chatSlice";

const SelectedImg = ({ src, name }) => {
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
		<div className={styles.selectedImg}>
			<img src={src} alt="" />
			<span onClick={cancelHandler}>
				<CrossIcon color="icon-on-color" />
			</span>
		</div>
	);
};

export default SelectedImg;

import styles from "./SelectedDoc.module.scss";
import DocIcon from "components/UI/Icons/ChatIcons/Doc";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import { useDispatch, useSelector } from "react-redux";
import { selectedAttachment } from "redux/chat/chatSelectors";
import { setSelectedAttachment } from "redux/chat/chatSlice";

const SelectedDoc = ({ name }) => {
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
		<div className={styles.selectedDoc}>
			<DocIcon />
			<b>{name}</b>
			<span onClick={cancelHandler}>
				<CrossIcon color="icon-on-color" />
			</span>
		</div>
	);
};

export default SelectedDoc;

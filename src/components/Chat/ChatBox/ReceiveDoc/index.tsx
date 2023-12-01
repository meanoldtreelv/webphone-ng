import styles from "./ReceiveDoc.module.scss";
import DocImg from "../../../../assets/images/img/doc.svg";
import { useDispatch } from "react-redux";
import { setIsDocumentViewerDialogueOpen } from "redux/chat/chatSlice";

const ReceiveDoc = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.receiveDoc}>
			<div
				onClick={() => {
					dispatch(setIsDocumentViewerDialogueOpen(true));
				}}>
				<span>
					<img src={DocImg} alt="" />
				</span>
				<span className={styles.details}>
					<span>Pricing sheet .......... 2022.dox</span>
					<b>127 kb</b>
				</span>
			</div>
		</div>
	);
};

export default ReceiveDoc;

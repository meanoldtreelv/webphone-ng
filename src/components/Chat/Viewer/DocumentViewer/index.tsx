import styles from "./DocumentViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import PlusIcon from "components/UI/Icons/ChatIcons/Plus";
import MinusIcon from "components/UI/Icons/ChatIcons/Minus";
import DownloadIcon from "components/UI/Icons/meet/Download";
import { useDispatch } from "react-redux";
import { setIsDocumentViewerDialogueOpen } from "redux/chat/chatSlice";

const DocumentViewer = () => {
	const dispatch = useDispatch();
	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<div className={styles.nameBox}>
						<span className={styles.initials}>SG</span>
						<div>
							<p className={styles.name}>Shivam Gupta</p>
							<p>{"March 8, 2023 11:49 AM - blake-verdoorn-cssvEZacHvQ-unsplash.jpg - 256Kb"}</p>
						</div>
					</div>
					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsDocumentViewerDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>

				<img src="/img/dummy/document.png" alt=""></img>
				<div className={styles.footer}>
					<div className={styles.zoomBox}>
						<span>
							<MinusIcon />
						</span>
						<span>
							<PlusIcon />
						</span>
					</div>
					<div className={styles.counter}>2/3</div>
					<div className={styles.download}>
						<DownloadIcon color="icon-primary" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentViewer;

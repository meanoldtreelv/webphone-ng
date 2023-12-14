import styles from "./ImgViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import PlusIcon from "components/UI/Icons/ChatIcons/Plus";
import MinusIcon from "components/UI/Icons/ChatIcons/Minus";
import DownloadIcon from "components/UI/Icons/meet/Download";
import { useDispatch, useSelector } from "react-redux";
import { setIsImgViewerDialogueOpen } from "redux/chat/chatSlice";
import { conversationData, imageFiles } from "redux/chat/chatSelectors";
import { contactAbbreviation } from "utils";
import { useState } from "react";

const ImgViewer = () => {
	const dispatch = useDispatch();
	const imageFile = useSelector(imageFiles);
	const conversationDatas = useSelector(conversationData);

	const [counter, setCounter] = useState(0);

	const first_name = conversationDatas?.contactsinfo?.[0]?.first_name;
	const last_name = conversationDatas?.contactsinfo?.[0]?.last_name;
	const phone = conversationDatas?.contactsinfo?.[0]?.number;

	let firstName: string;
	let lastName: string;

	if (first_name === "undefine" || first_name === null) {
		firstName = "";
	} else {
		firstName = first_name;
	}

	if (last_name === "undefine" || last_name === null) {
		lastName = "";
	} else {
		lastName = last_name;
	}
	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<div className={styles.nameBox}>
						<span className={styles.initials}>{contactAbbreviation(first_name, last_name, phone, "")}</span>
						<div>
							<p className={styles.name}>{firstName + " " + lastName}</p>
							<p>{imageFile[counter]?.name}</p>
						</div>
					</div>
					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsImgViewerDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>

				<img src={imageFile[counter]?.preview?.base64} alt="" />
				<div className={styles.footer}>
					<div className={styles.zoomBox}>
						<span>
							<MinusIcon />
						</span>
						<span>
							<PlusIcon />
						</span>
					</div>
					<div className={styles.counter}>1/{imageFile.length}</div>
					<div className={styles.download}>
						<DownloadIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImgViewer;

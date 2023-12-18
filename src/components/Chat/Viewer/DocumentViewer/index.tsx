import styles from "./DocumentViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import PlusIcon from "components/UI/Icons/ChatIcons/Plus";
import MinusIcon from "components/UI/Icons/ChatIcons/Minus";
import DownloadIcon from "components/UI/Icons/meet/Download";
import { useDispatch, useSelector } from "react-redux";
import { setIsDocumentViewerDialogueOpen } from "redux/chat/chatSlice";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import { contactAbbreviation, showToast } from "utils";
import { useEffect, useState } from "react";
import { useLazyRepresentationFilesQuery } from "services/storage";
import { conversationData } from "redux/chat/chatSelectors";

const DocumentViewer = () => {
	const dispatch = useDispatch();

	// const imageFile = useSelector(imageFiles);
	const conversationDatas = useSelector(conversationData);

	const [representationFiles, { data, isFetching, isLoading }] = useLazyRepresentationFilesQuery();

	const [counter, setCounter] = useState(0);
	const [docData, setDocData] = useState({});

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const { data, error } = await representationFiles({ id: imageFile?.[counter]?.id, data: {} });
				// if (error) {
				// 	console.log(error);
				// 	showToast("There is some error in representation of the file", "error");
				// }
				// if (data) {
				// 	console.log("Fetched data:", data); // Log data here
				// 	setDocData(data);
				// }
			} catch (err) {
				console.error("Error in fetchData:", err); // Log any caught errors
			}
		};
		fetchData();
	}, [counter]);

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<div className={styles.nameBox}>
						{conversationDatas?.conversation_type === "group" || conversationDatas?.conversation_type === "campaign" ? (
							<span className={styles.initials_group}>
								<UserGroupIcon />
							</span>
						) : (
							<span className={styles.initials}>{contactAbbreviation(first_name, last_name, phone, "")}</span>
						)}
						<div>
							<p className={styles.name}>
								{conversationDatas?.conversation_type === "group" || conversationDatas?.conversation_type === "campaign"
									? conversationDatas?.campaign_info?.name
									: firstName + lastName
									? firstName + " " + lastName
									: ""}
							</p>
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

				<img src={docData?.original?.preview?.base64} alt="" />
				<div className={styles.footer}>
					<div className={styles.zoomBox}>
						<span>
							<MinusIcon />
						</span>
						<span>
							<PlusIcon />
						</span>
					</div>
					<div className={styles.counter}>
						{counter + 1}/{"3"}
					</div>

					<a href={docData?.url} className={styles.download}>
						<DownloadIcon color="icon-primary" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default DocumentViewer;

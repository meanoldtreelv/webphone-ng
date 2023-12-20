import { useEffect, useState } from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";
import SharePopUp from "./SharePopUp";
import SelectedImg from "./SelectedImg";
import SelectedVideo from "./SelectedVideo";
import SelectedAudio from "./SelectedAudio";
import SelectedDoc from "./SelectedDoc";
import { useLazySendOutboundMessageQuery } from "services/chat";
import { useDispatch, useSelector } from "react-redux";
import {
	conversationData,
	emoji,
	isDeleteCheck,
	msgLists,
	selectedAttachment,
	selectedFiles,
} from "redux/chat/chatSelectors";
import { showToast } from "utils";
import EmojiIcon from "components/UI/Icons/Emoji";
import SettingsIcon from "components/Voicemail/Settings";
import { setIsMsgSending, setIsSettingDialogueOpen, setLatestMsgRandomId, setMsgLists } from "redux/chat/chatSlice";
import SelectedMsgControl from "./SelectedMsgControl";
import EmojiPickers from "../EmojiPickers";
import { useLazyPostFilesQuery, useLazyUploadFilesQuery } from "services/storage";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";
import SelectedContact from "./SelectedContact";
import { generateRandomId } from "helpers";
import { convertNewDateToString } from "helpers/formatDateTime";

const ConversationsFooter = () => {
	const dispatch = useDispatch();

	const conversationDatas = useSelector(conversationData);
	const deleteCheck = useSelector(isDeleteCheck);
	const emojiSelected = useSelector(emoji);
	const selectedAttachments = useSelector(selectedAttachment);
	const messageLists = useSelector(msgLists);

	const [sendOutboundMessage, { data, isLoading, isFetching: isFetchingMsg }] = useLazySendOutboundMessageQuery();
	const [postFiles, { data: fileData, isError }] = useLazyPostFilesQuery();
	const [uploadFiles] = useLazyUploadFilesQuery();
	const [isAttachmentHovered, setIsAttachmentHovered] = useState(false);
	const [isAttachmentClicked, setIsAttachmentClicked] = useState(false);
	const [emojiPicker, setEmojiPicker] = useState(false);

	const [text, setText] = useState("");
	const [filePreviews, setFilePreviews] = useState([]);
	const [fileResponse, setFileResponse] = useState<{}[]>([]);
	const [uploadId, setUploadId] = useState([]);
	const [textData, setTextData] = useState({});

	const sendMessageHandler = async () => {
		setFileResponse([]);
		setUploadId([]);

		console.log(generateRandomId(15));

		if (selectedAttachments?.length > 0) {
			for (const item of selectedAttachments || []) {
				const { data, error } = await postFiles({
					company_id: conversationDatas?.company_id,
					name: item?.name,
				});

				if (data) {
					// console.log(data, "file dtaa response");

					setFileResponse((prevState) => [...prevState, data]);
				}
				if (error) {
					showToast("something went wrong ", "error");
					return;
				}
			}

			// const selectedFiles = selectedAttachments || [];
			// for (let i = 0; i < selectedFiles.length; i++) {
			// 	const file = selectedFiles[i];
			// 	const formData = new FormData();
			// 	formData.append("upfile", file); // Assuming 'file' is the actual file object you want to upload
			// 	const { error: filesError, data: filesData } = await uploadFiles({
			// 		id: fileResponse[i]?.id,
			// 		data: formData,
			// 	});

			// 	if (filesData) {
			// 		console.log(filesData, "data");
			// 	}
			// 	if (filesError) {
			// 		showToast("something went wrong ", "error");
			// 		return;
			// 	}
			// }
		} else {
			const randomId = generateRandomId(15);
			const newLists = [
				{ id: randomId, text: text, direction: "outbound", created_at: convertNewDateToString(new Date()), files: [] },
				...messageLists,
			];
			dispatch(setLatestMsgRandomId(randomId));
			dispatch(setMsgLists(newLists));

			setText("");

			const { error, data } = await sendOutboundMessage({
				id: conversationDatas?.id,
				data: textData,
			});

			if (data) {
				// setText("");
				// showToast("message send successfully", "info");
			}

			if (error) {
				showToast("There is error in sending text msg , please try again later  ", "error");
			}
		}
	};

	useEffect(() => {
		dispatch(setIsMsgSending(isFetchingMsg));
	}, [isFetchingMsg]);

	useEffect(() => {
		console.log(fileResponse, "fileResponse");
		if (selectedAttachments.length === 0 || fileResponse.length !== selectedAttachments.length) return;
		const fetchData = async () => {
			const selectedFiles = selectedAttachments || [];
			for (let i = 0; i < selectedFiles.length; i++) {
				const file = selectedFiles[i];
				const formData = new FormData();
				formData.append("upfile", file); // Assuming 'file' is the actual file object you want to upload
				const id = fileResponse[i]?.id;
				const { error: filesError, data: filesData } = await uploadFiles({
					id: id,
					data: formData,
				});

				if (filesData) {
					setUploadId((prevState) => [...prevState, filesData?.id]);
					console.log(filesData, "data");
				}
				if (filesError) {
					showToast("something went wrong ", "error");
					return;
				}
			}
		};
		// fetchData();
		// const sendData = async () => {
		// 	const { error, data } = await sendOutboundMessage({
		// 		id: conversationDatas?.id,
		// 		data: {
		// 			text: text,
		// 			with_warning: false,
		// 		},
		// 	});

		// 	if (data) {
		// 		setText("");
		// 		showToast("message send successfully", "info");
		// 	}

		// 	if (error) {
		// 		showToast("There is error in sending text msg , please try again later  ", "error");
		// 	}
		// };
		// sendData();
	}, [fileResponse, selectedAttachments]);

	useEffect(() => {
		if (selectedAttachments.length === 0 || uploadId.length !== selectedAttachments.length) return;
		console.log(uploadId, "uploadid");

		// data: {
		// 	created_at: "2023-12-19T02:50:40.570Z",
		// 	files: ["658105003015972ceebae740", "65810500ce769fef5abf0239"],
		// 	stamp_id: "04966ce0-4994-48de-b062-8da751f3f30b",
		// 	text: "",
		// 	with_warning: false,
		// },
		const sendData = async () => {
			// todo - edit stamp id
			const { error, data } = await sendOutboundMessage({
				id: conversationDatas?.id,
				data: {
					created_at: new Date(),
					files: uploadId,
					stamp_id: "04966ce0-4994-48de-b062-8da751f3f30b",
					text: text,
					with_warning: false,
				},
			});

			if (data) {
				setText("");
				showToast("message send successfully", "info");
			}

			if (error) {
				showToast("There is error in sending text msg , please try again later  ", "error");
			}
		};
		// sendData();
	}, [uploadId]);

	useEffect(() => {
		if (!emojiSelected) return;
		setText((prevState) => prevState + emojiSelected);
	}, [emojiSelected]);

	useEffect(() => {
		const previews = [];
		for (let i = 0; i < selectedAttachments?.length; i++) {
			const reader = new FileReader();

			reader.onload = (e) => {
				previews.push({
					target: e.target.result,
					name: selectedAttachments?.[i]?.name,
					type: selectedAttachments?.[i]?.type,
				});

				if (previews?.length === selectedAttachments?.length) {
					setFilePreviews([...previews]);
				}
			};

			reader.readAsDataURL(selectedAttachments[i]);
		}
	}, [selectedAttachments]);

	return (
		<>
			<div className={styles.footer}>
				{false && (
					<div className={styles.audioPlaying}>
						<div>
							<span>
								<PlayerPause color="default-primary" />
							</span>
							<b>Call record 2402.wav</b>
						</div>
						<div>
							<b>02:30</b>
							<span>
								<CloseIcon />
							</span>
						</div>
					</div>
				)}
				{emojiPicker && <EmojiPickers />}

				<div className={styles.top}>
					{isAttachmentClicked && <SharePopUp />}
					<span
						onClick={() => {
							setIsAttachmentClicked(!isAttachmentClicked);
						}}
						onMouseOver={() => {
							setIsAttachmentHovered(true);
						}}
						onMouseOut={() => {
							setIsAttachmentHovered(false);
						}}
						className={`${styles.attachment} ${
							isAttachmentHovered || isAttachmentClicked ? styles.attachment_active : ""
						}`}>
						<AttachmentIcon
							color={`${isAttachmentHovered || isAttachmentClicked ? "primary-default" : "icon-primary"}`}
						/>
					</span>
					<div className={styles.inputBox}>
						<input
							type="text"
							placeholder="Enter your message"
							value={text}
							onChange={(e) => {
								setText(e.target.value);
								setTextData({
									text: e.target.value,
									with_warning: false,
								});
							}}
							onKeyDownCapture={(e) => {
								if (e.key === "Enter" && text !== "") {
									setEmojiPicker(false);

									sendMessageHandler();
								}
							}}
						/>
						<div className={styles.icon}>
							<span
								className={styles.icon1}
								onClick={() => {
									setEmojiPicker(!emojiPicker);
								}}>
								<EmojiIcon />
							</span>
							{/* <span className={styles.icon1}>
								<MicrophoneIcon />
							</span> */}
						</div>
					</div>
					<button
						className={`${styles.send} ${text?.length > 0 ? styles.send_active : ""}`}
						onClick={() => {
							// setTextData({
							// 	text: text,
							// 	with_warning: false,
							// });
							sendMessageHandler();
						}}>
						<AirplaneIcon color="icon-on-color" />
					</button>
				</div>
				<div className={styles.bottom}>
					{/* If img or video selected please dispatch an boolean action for padding bottom to chatBox */}
					{/* 
				<SelectedContact /> */}
					{filePreviews?.map((item) => {
						// todo- need to add more checks
						if (
							item.type === "image/jpeg" ||
							item.type === "image/png" ||
							item.type === "image/jpg" ||
							item.type === "image/webp"
						) {
							return <SelectedImg src={item.target} name={item?.name} />;
						}
						if (item.type === "video/mp4" || item.type === "video/mov") {
							return <SelectedVideo src={item.target} name={item?.name} />;
						}
						if (item.type === "application/pdf" || item.type === "application/doc") {
							return <SelectedDoc name={item?.name} />;
						}
						if (item.type === "audio/mpeg" || item.type === "audio/mp3") {
							return <SelectedAudio name={item?.name} />;
						}
					})}
				</div>
				<div className={styles.settingBar}>
					<p>{conversationDatas?.from_number}</p>
					<span
						onClick={() => {
							dispatch(setIsSettingDialogueOpen(true));
						}}>
						<SettingsIcon />
					</span>
				</div>
				{deleteCheck && <SelectedMsgControl />}
			</div>
		</>
	);
};

export default ConversationsFooter;

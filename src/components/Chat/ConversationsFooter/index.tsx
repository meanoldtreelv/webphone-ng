import { useEffect, useState } from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";
import SharePopUp from "./SharePopUp";
import SelectedImg from "./SelectedImg";
import SelectedVideo from "./SelectedVideo";
import SelectedAudio from "./SelectedAudio";
import SelectedDoc from "./SelectedDoc";
import SelectedContact from "./SelectedContact";
import { useLazySendOutboundMessageQuery } from "services/chat";
import { useDispatch, useSelector } from "react-redux";
import { conversationData, emoji, isDeleteCheck, selectAllMsg, selectedFiles } from "redux/chat/chatSelectors";
import { showToast } from "utils";
import EmojiIcon from "components/UI/Icons/Emoji";
import SettingsIcon from "components/Voicemail/Settings";
import { setIsSettingDialogueOpen } from "redux/chat/chatSlice";
import SelectedMsgControl from "./SelectedMsgControl";
import EmojiPickers from "../EmojiPickers";
import { useLazyPostFilesQuery, useLazyUploadFilesQuery } from "services/storage";

const ConversationsFooter = () => {
	const dispatch = useDispatch();

	const conversationDatas = useSelector(conversationData);
	const deleteCheck = useSelector(isDeleteCheck);
	const emojiSelected = useSelector(emoji);
	const selectedFile = useSelector(selectedFiles);

	const [sendOutboundMessage, { data, isLoading }] = useLazySendOutboundMessageQuery();
	const [postFiles, { data: data2 }] = useLazyPostFilesQuery();
	const [uploadFiles] = useLazyUploadFilesQuery();
	const [isAttachmentHovered, setIsAttachmentHovered] = useState(false);
	const [isAttachmentClicked, setIsAttachmentClicked] = useState(false);
	const [emojiPicker, setEmojiPicker] = useState(false);

	const [text, setText] = useState("");
	const [imagePreviews, setImagePreviews] = useState([]);
	const [fileResponse, setFileResponse] = useState<{}[]>([]);

	const sendMessageHandler = async () => {
		if (selectedFile?.length > 0) {
			for (const item of selectedFile || []) {
				const { data, error } = await postFiles({
					company_id: conversationDatas?.company_id,
					name: item?.name,
				});

				if (data) {
					// console.log("====================================");
					// console.log(data, "file dtaa response");
					// console.log("====================================");
					// setFileResponse((prevState) => [...prevState, filesData]);
				}
				if (error) {
					showToast("something went wrong ", "error");
					return;
				}
			}
			// console.log("====================================");
			// console.log(fileResponse, "fileResponse");
			// console.log("====================================");
			// const selectedFiles = selectedFile || [];
			// for (let i = 0; i < selectedFiles.length; i++) {
			// 	const item = selectedFiles[i];
			// 	const { error: filesError, data: filesData } = await uploadFiles({
			// 		id: fileResponse[i]?.id,
			// 		data: {
			// 			upfile: selectedFiles[i],
			// 		},
			// 	});

			// 	if (filesError) {
			// 		showToast("something went wrong ", "error");
			// 		return;
			// 	}
			// }
		}

		// const { error, data } = await sendOutboundMessage({
		// 	id: conversationDatas?.id,
		// 	data: {
		// 		text: text,
		// 		with_warning: false,
		// 	},
		// });

		// if (data) {
		// 	setText("");
		// 	showToast("message send successfully", "info");
		// }

		// if (error) {
		// 	showToast("There is error in sending text msg , please try again later  ", "error");
		// }
	};

	// console.log(fileResponse, "fileResponse");
	// console.log("====================================");
	// console.log(conversationDatas);
	// console.log("====================================");

	// console.log("====================================");
	// console.log(data2);
	// console.log("====================================");

	useEffect(() => {
		// console.log(data2);
	}, [data2]);

	useEffect(() => {
		if (!emojiSelected) return;
		setText((prevState) => prevState + emojiSelected);
	}, [emojiSelected]);

	useEffect(() => {
		const previews = [];
		for (let i = 0; i < selectedFile?.length; i++) {
			const reader = new FileReader();

			reader.onload = (e) => {
				previews.push({ target: e.target.result, name: selectedFile?.[i]?.name, type: selectedFile?.[i]?.type });
				// console.log("====================================");
				// console.log(e.target.result, "target");
				// console.log("====================================");
				if (previews?.length === selectedFile?.length) {
					setImagePreviews([...previews]);
				}
			};

			reader.readAsDataURL(selectedFile[i]);
		}
	}, [selectedFile]);

	// console.log("====================================");
	// console.log(selectedFile, "selected file");
	// console.log("====================================");
	// console.log(imagePreviews);
	// console.log("====================================");
	// console.log("====================================");
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
						onClick={sendMessageHandler}>
						<AirplaneIcon color="icon-on-color" />
					</button>
				</div>
				<div className={styles.bottom}>
					{/* If img or video selected please dispatch an boolean action for padding bottom to chatBox */}
					{/* <SelectedImg />
					<SelectedVideo />
					<SelectedAudio />
					<SelectedDoc />
				<SelectedContact /> */}
					{imagePreviews?.map((item) => <SelectedImg src={item.target} name={item?.name} />)}
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

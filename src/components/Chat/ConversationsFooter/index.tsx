import { useEffect, useState } from "react";
import styles from "./ConversationsFooter.module.scss";
import AttachmentIcon from "components/UI/Icons/ChatIcons/Attachment";
import AirplaneIcon from "components/UI/Icons/ChatIcons/Airplane";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";
import SharePopUp from "./SharePopUp";
import SelectedImg from "./SelectedImg";
import MicrophoneIcon from "components/UI/Icons/ChatIcons/Microphone";
import SelectedVideo from "./SelectedVideo";
import SelectedAudio from "./SelectedAudio";
import SelectedDoc from "./SelectedDoc";
import SelectedContact from "./SelectedContact";
import { useLazySendOutboundMessageQuery } from "services/chat";
import { useDispatch, useSelector } from "react-redux";
import { conversationData, emoji, isDeleteCheck, selectedAttachment, selectedFiles } from "redux/chat/chatSelectors";
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
	const selectedAttachments = useSelector(selectedAttachment);

	const [sendOutboundMessage, { data, isLoading }] = useLazySendOutboundMessageQuery();
	const [postFiles, { data: fileData, isError }] = useLazyPostFilesQuery();
	const [uploadFiles] = useLazyUploadFilesQuery();
	const [isAttachmentHovered, setIsAttachmentHovered] = useState(false);
	const [isAttachmentClicked, setIsAttachmentClicked] = useState(false);
	const [emojiPicker, setEmojiPicker] = useState(false);

	const [text, setText] = useState("");
	// const [imagePreviews, setImagePreviews] = useState([]);
	const [filePreviews, setFilePreviews] = useState([]);
	const [fileResponse, setFileResponse] = useState<{}[]>([]);

	useEffect(() => {
		console.log("------------------------------------------");
		console.log("------------------------------------------");
		console.log("fileData: ", fileData);
		console.log("isError: ", isError);
		console.log("------------------------------------------");
		console.log("------------------------------------------");
	}, [fileData, isError]);

	const sendMessageHandler = async () => {
		if (selectedAttachments?.length > 0) {
			for (const item of selectedAttachments || []) {
				const { data, error } = await postFiles({
					company_id: conversationDatas?.company_id,
					name: item?.name,
				});

				// debugger;

				if (data) {
					console.log(data, "file dtaa response");

					// setFileResponse((prevState) => [...prevState, filesData]);
				}
				if (error) {
					showToast("something went wrong ", "error");
					return;
				}
			}

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

		const { error, data } = await sendOutboundMessage({
			id: conversationDatas?.id,
			data: {
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

	console.log(selectedAttachments, "selectedAttachments");
	console.log(filePreviews, "imagePreviews");

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
					{filePreviews?.map((item) => {
						// todo- need to add more checks
						if (item.type === "image/jpeg") {
							return <SelectedImg src={item.target} name={item?.name} />;
						}
						if (item.type === "video/mp4") {
							return <SelectedVideo src={item.target} name={item?.name} />;
						}
						if (item.type === "application/pdf") {
							return <SelectedDoc name={item?.name} />;
						}
						if (item.type === "audio/mpeg") {
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

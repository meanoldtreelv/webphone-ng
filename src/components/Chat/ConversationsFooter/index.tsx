import { useState } from "react";
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
import { useSelector } from "react-redux";
import { conversationData } from "redux/chat/chatSelectors";
import { showToast } from "utils";
import EmojiIcon from "components/UI/Icons/Emoji";
import SettingsIcon from "components/Voicemail/Settings";
// import SettingsIcon from "components/UI/Icons/Sidebar/Settings";

const ConversationsFooter = () => {
	const conversationDatas = useSelector(conversationData);
	const [sendOutboundMessage, { data, isLoading }] = useLazySendOutboundMessageQuery();
	const [isAttachmentHovered, setIsAttachmentHovered] = useState(false);
	const [isAttachmentClicked, setIsAttachmentClicked] = useState(false);

	const [text, setText] = useState("");

	const sendData = async () => {
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

	const sendMessageHandler = () => {
		sendData();
	};

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
									sendMessageHandler();
								}
							}}
						/>
						<div className={styles.icon}>
							<span className={styles.icon1}>
								<EmojiIcon />
							</span>
							<span className={styles.icon1}>
								<MicrophoneIcon />
							</span>
						</div>
					</div>
					<button
						className={`${styles.send} ${text.length > 0 ? styles.send_active : ""}`}
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
				</div>
				<div className={styles.settingBar}>
					<p>7007464887</p>
					<span>
						<SettingsIcon />
					</span>
				</div>
			</div>
		</>
	);
};

export default ConversationsFooter;

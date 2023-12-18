import { useDispatch, useSelector } from "react-redux";
import styles from "./ReceiveFiles.module.scss";
import {
	setIsAudioViewerDialogueOpen,
	setIsDocumentViewerDialogueOpen,
	setIsImgViewerDialogueOpen,
	setIsVideoViewerDialogueOpen,
	setSelectedFiles,
	setSelectedMsgLists,
} from "redux/chat/chatSlice";
import ReceiveTime from "../ReceiveTime";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import DocImg from "../../../../assets/images/img/doc.svg";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import SoundWaves1 from "../../../../assets/images/img/sound_wave_receive.svg";
import { formatTime } from "helpers/formatDateTime";
import { convertByteIntoKbMb } from "helpers";

const ReceiveFiles = ({ id, time, text, files }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectedMsgList = useSelector(selectedMsgLists);

	const handleSelectInput = () => {
		!selectedMsgList.includes(id)
			? dispatch(setSelectedMsgLists({ type: "ADD", id }))
			: dispatch(setSelectedMsgLists({ id }));
	};

	return (
		<div className={`${styles.msgDiv} ${deleteCheck && styles.msgDiv_active}`}>
			<div className={styles.left}>
				<div className={styles.left_box}>
					<ReceiveTime time={time} />
					<div className={styles.receiveChat}>
						<span>{text ? text : ""}</span>
					</div>
					{files?.map((data, index) => {
						if (data?.mimetype === "image/png") {
							return (
								<div className={styles.receiveImg}>
									<span
										onClick={() => {
											dispatch(setSelectedFiles(data));
											dispatch(setIsImgViewerDialogueOpen(true));
										}}>
										<img src={data?.preview?.base64} alt="" />
									</span>
								</div>
							);
						}
						if (data?.mimetype === "video/mp4") {
							return (
								<div className={styles.receiveVideo}>
									<span
										onClick={() => {
											dispatch(setIsVideoViewerDialogueOpen(true));
											dispatch(setSelectedFiles(data));
										}}>
										<img src={data?.preview?.base64} alt="" />
										<span className={styles.btnPlay}>
											<BtnPlay />
										</span>
										<span className={styles.duration}>{formatTime(data?.duration)}</span>
									</span>
								</div>
							);
						}
						if (data?.mimetype === "application/pdf") {
							return (
								<div className={styles.receiveDoc}>
									<div
										onClick={() => {
											dispatch(setIsDocumentViewerDialogueOpen(true));
											dispatch(setSelectedFiles(data));
										}}>
										<span>
											<img src={DocImg} alt="" />
										</span>
										<span className={styles.details}>
											<span>{data?.name}</span>
											<b>{convertByteIntoKbMb(data?.size)}</b>
										</span>
									</div>
								</div>
							);
						}
						if (data?.mimetype === "audio/mpeg") {
							return (
								<div className={styles.receiveAudio}>
									<div
										className={styles.audio}
										onClick={() => {
											dispatch(setIsAudioViewerDialogueOpen(true));
											dispatch(setSelectedFiles(data));
										}}>
										<PlayerPlay color="primary-default" />
										<div>
											<img src={SoundWaves1} alt="" />
											<span className={styles.soundDetails}>
												<span>{data?.name}</span>
												<span className={styles.duration}>{formatTime(data?.duration)}</span>
											</span>
										</div>
									</div>
								</div>
							);
						}
						return null; // Or handle non-PNG files if needed
					})}
				</div>
			</div>
			{deleteCheck && (
				<input type="checkbox" name="" id={id} checked={selectedMsgList.includes(id)} onChange={handleSelectInput} />
			)}
		</div>
	);
};

export default ReceiveFiles;

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
import { contactAbbreviation } from "utils";
import ThreeDotsIcon from "components/UI/Icons/meet/ThreeDots";
import ContactDetailsPopUp from "../ContactDetailsPopup";
import { useState } from "react";
import { ContactReceive } from "../ReceiveContact";

const ReceiveFiles = ({ id, time, text, files }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectedMsgList = useSelector(selectedMsgLists);

	const [isContactMenuPopUpOpen, setIsContactMenuPopUpOpen] = useState(false);

	const handleSelectInput = () => {
		!selectedMsgList.includes(id)
			? dispatch(setSelectedMsgLists({ type: "ADD", id }))
			: dispatch(setSelectedMsgLists({ id }));
	};

	return (
		<div className={`${styles.msgDiv} ${deleteCheck && styles.msgDiv_active}`}>
			<div className={styles.left}>
				<ReceiveTime time={time} />
				<div className={styles.left_box}>
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
						if (data?.mimetype === "text/vcard") {
							return (
								<div>
									{data?.json_preview?.map((item) => {
										// const first_name = item?.full_name?.first_name;
										// const last_name = item?.full_name?.last_name;
										// const phone = item?.phone_numbers?.[0];
										// const email = item?.email;

										// let firstName: string;
										// let lastName: string;
										// let number: any;

										// if (first_name === "undefine" || first_name === null) {
										// 	firstName = "";
										// } else {
										// 	firstName = first_name;
										// }

										// if (last_name === "undefine" || last_name === null) {
										// 	lastName = "";
										// } else {
										// 	lastName = last_name;
										// }
										// if (phone === "undefine" || phone === null) {
										// 	number = "";
										// } else {
										// 	number = phone;
										// }

										return (
											<ContactReceive item={item} />
											// <div className={styles.contact}>
											// 	<div>
											// 		<span className={styles.initials}>
											// 			{contactAbbreviation(first_name, last_name, phone, "")}
											// 		</span>
											// 		<span className={styles.details}>
											// 			<span className={styles.name}>
											// 				{firstName + lastName ? firstName + " " + lastName : ""}
											// 			</span>
											// 			<span className={styles.number}>{number || email}</span>
											// 		</span>
											// 	</div>
											// 	<span
											// 		onClick={() => {
											// 			setIsContactMenuPopUpOpen(!isContactMenuPopUpOpen);
											// 		}}>
											// 		<ThreeDotsIcon />
											// 	</span>
											// 	{isContactMenuPopUpOpen && <ContactDetailsPopUp />}
											// </div>
										);
									})}
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

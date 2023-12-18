import { useEffect, useState } from "react";
import styles from "./AudioViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import DownloadIcon from "components/UI/Icons/meet/Download";
import VolumeIcon from "components/UI/Icons/ChatIcons/Volume";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import MusicIcon from "components/UI/Icons/ChatIcons/Music";
import PlayPrevIcon from "components/UI/Icons/ChatIcons/PlayPrev";
import PlayNextIcon from "components/UI/Icons/ChatIcons/PlayNext";
import { useDispatch, useSelector } from "react-redux";
import { setIsAudioViewerDialogueOpen } from "redux/chat/chatSlice";
import { conversationData, selectedFiles } from "redux/chat/chatSelectors";
import { useLazyGenerateUrlQuery } from "services/storage";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import { contactAbbreviation, showToast } from "utils";
import { formatTime } from "helpers/formatDateTime";

const AudioViewer = () => {
	const dispatch = useDispatch();

	const selectedFile = useSelector(selectedFiles);
	const conversationDatas = useSelector(conversationData);

	const [generateUrl] = useLazyGenerateUrlQuery();

	const [isPlayBtnTrue, setIsPlayBtnTrue] = useState(false);
	const [audioData, setAudioData] = useState("");

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
				const { data, error } = await generateUrl({ id: selectedFile?.id, data: { expire: 120 } });
				if (error) {
					// console.log(error);
					showToast("There is some error in representation of the file", "error");
				}
				if (data) {
					// console.log("Fetched data:", data); // Log data here
					setAudioData(data);
				}
			} catch (err) {
				console.error("Error in fetchData:", err); // Log any caught errors
			}
		};
		fetchData();
	}, [selectedFile]);

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
							<p>{selectedFile?.name}</p>
						</div>
					</div>
					<span
						className={styles.icon}
						onClick={() => {
							dispatch(setIsAudioViewerDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>
				<div className={styles.content}>
					<span>
						<MusicIcon />
					</span>
					<div>{selectedFile?.name}</div>
					<p>Now playing...</p>
				</div>

				<div className={styles.footer}>
					<div className={styles.progressBar}>
						<span className={styles.progress}></span>
					</div>
					<div className={styles.duration}>
						<span>00:00</span>
						<span>{formatTime(selectedFile?.duration)}</span>
					</div>
					<div>
						<audio controls>
							{/* <source src={audioData} type="audio/ogg" /> */}
							<source src={audioData} type="audio/mp3" />
						</audio>
					</div>
					<div className={styles.bottom}>
						<span className={styles.icon}>
							<VolumeIcon />
						</span>
						<div className={styles.control}>
							<span className={styles.nextPrev}>
								<PlayPrevIcon />
							</span>

							<span
								className={styles.playPause}
								onClick={() => {
									setIsPlayBtnTrue(!isPlayBtnTrue);
								}}>
								{isPlayBtnTrue ? <PlayerPause color="primary-default" /> : <PlayerPlay color="primary-default" />}
							</span>
							<span className={styles.nextPrev}>
								<PlayNextIcon />
							</span>
						</div>

						<a href={audioData} className={styles.icon} target="_blank" rel="noreferrer">
							<DownloadIcon color="icon-primary" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AudioViewer;

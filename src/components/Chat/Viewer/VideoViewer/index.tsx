import styles from "./VideoViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import DownloadIcon from "components/UI/Icons/meet/Download";
import ExpandIcon from "components/UI/Icons/ChatIcons/Expand";
import VolumeIcon from "components/UI/Icons/ChatIcons/Volume";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsVideoViewerDialogueOpen } from "redux/chat/chatSlice";
import { conversationData } from "redux/chat/chatSelectors";
import { useLazyRepresentationFilesQuery } from "services/storage";
import { contactAbbreviation, showToast } from "utils";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";

const VideoViewer = () => {
	const dispatch = useDispatch();

	// const imageFile = useSelector(imageFiles);
	const conversationDatas = useSelector(conversationData);

	const [representationFiles, { data, isFetching, isLoading }] = useLazyRepresentationFilesQuery();

	const [counter, setCounter] = useState(0);
	const [videoData, setVideoData] = useState({});
	const [isPlayBtnTrue, setIsPlayBtnTrue] = useState(false);

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
				const { data, error } = await representationFiles({ id: imageFile?.[counter]?.id, data: {} });

				if (error) {
					console.log(error);
					showToast("There is some error in representation of the file", "error");
				}

				if (data) {
					console.log("Fetched data:", data); // Log data here
					setVideoData(data);
				}
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
						className={styles.icon}
						onClick={() => {
							dispatch(setIsVideoViewerDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>

				<video src={videoData?.original?.preview?.base64 || "/video/video.mp4"} />
				<div className={styles.footer}>
					<div className={styles.left}>
						<span
							className={styles.playPause}
							onClick={() => {
								setIsPlayBtnTrue(!isPlayBtnTrue);
							}}>
							{isPlayBtnTrue ? <PlayerPlay color="primary-default" /> : <PlayerPause color="primary-default" />}
						</span>
						<span className={styles.icon}>
							<VolumeIcon />
						</span>
						<span className={styles.duration}>02:30/{videoData?.duration || "00:00"}</span>
					</div>
					<div className={styles.progressBar}>
						<span className={styles.progress}></span>
					</div>
					<div className={styles.iconBox}>
						<span className={styles.icon}>
							<ExpandIcon />
						</span>
						<a href={videoData?.url} className={styles.icon}>
							<DownloadIcon color="icon-primary" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoViewer;

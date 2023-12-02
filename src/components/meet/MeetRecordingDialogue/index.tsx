import Backdrop from "components/UI/Backdrop";
import { useEffect, useState } from "react";
import styles from "./MeetRecordingDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import PlayIcon from "components/UI/Icons/Voicemail/Play";
import DownloadIcon from "components/UI/Icons/meet/Download";
import { useDispatch, useSelector } from "react-redux";
import { setRecordDialogue } from "redux/meet/meetSlice";
import { meetingId } from "redux/meet/meetSelectors";
import { useLazyGetMeetFilesQuery } from "services/meet";
import { ClipLoader } from "react-spinners";

const MeetRecordingDialogue = () => {
	const dispatch = useDispatch();
	const meetId = useSelector(meetingId);
	const [meetFiles, setMeetFiles] = useState([]);
	const [getMeetFile, { data: meetFileData, isFetching }] = useLazyGetMeetFilesQuery();

	function convertSecondsToHHMM(durationInSeconds) {
		var hours = Math.floor(durationInSeconds / 3600);
		var minutes = Math.floor((durationInSeconds % 3600) / 60);
		var seconds = (durationInSeconds % 60).toFixed(6);

		// Ensure that the hours, minutes, and seconds are displayed with leading zeros if needed
		var formattedHours = hours.toString().padStart(2, "0");
		var formattedMinutes = minutes.toString().padStart(2, "0");

		return formattedHours + ":" + formattedMinutes;
	}

	function bytesToKilobytes(bytes) {
		const kilobytes = (bytes / 1024).toFixed(2);
		if (kilobytes >= 1000) {
			const megabyte = `${(kilobytes / 1000).toFixed(2)} Mb`;
			return megabyte;
		} else {
			return `${kilobytes} Kb`;
		}
	}

	useEffect(() => {
		const getMeetFileHandler = async () => {
			await getMeetFile(meetId);
		};

		getMeetFileHandler();
	}, []);

	useEffect(() => {
		setMeetFiles(meetFileData?.video_info);
	}, [meetFileData]);

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Meet Recording</span>
					</span>

					<span
						onClick={() => {
							dispatch(setRecordDialogue(false));
						}}
						style={{ cursor: "pointer" }}>
						<CloseIcon />
					</span>
				</h1>
				{isFetching ? (
					<div className={styles.loader}>
						{" "}
						<ClipLoader color="black" size={20} />
					</div>
				) : (
					<>
						{meetFiles?.map((item) => (
							<div className={styles.recording} key={item.name}>
								<PlayIcon />
								<span className={styles.recording_name}>{item.name}</span>
								<span>{convertSecondsToHHMM(item.metadata?.["rec-duration"])}</span>
								<span>({bytesToKilobytes(item.content_length)})</span>
								<a href={item?.video_link} style={{ cursor: "pointer" }}>
									<DownloadIcon />
								</a>
							</div>
						))}
					</>
				)}

				<div className={styles.btnBox}>
					<button
						onClick={() => {
							dispatch(setRecordDialogue(false));
						}}>
						Close
					</button>
				</div>
			</div>
		</>
	);
};

export default MeetRecordingDialogue;

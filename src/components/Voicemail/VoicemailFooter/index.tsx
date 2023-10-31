import styles from "./VoicemailFooter.module.scss";
import ShareBtnPopup from "./../ShareBtnPopup";
import PlayPrevIcon from "./../../../components/UI/Icons/Voicemail/PlayPrev";
import PauseIcon from "./../../../components/UI/Icons/Voicemail/Pause";
import PlayNextIcon from "./../../../components/UI/Icons/Voicemail/PlayNext";
import ShareIcon from "./../../../components/UI/Icons/Voicemail/Share";
import SettingsIcon from "./../Settings";
import PlayIcon from "./../../../components/UI/Icons/Voicemail/Play";
import { useDispatch, useSelector } from "react-redux";
import { selectedVoicemail, voicemailResults } from "./../../../redux/voicemail/voicemailSelectors";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { convertDateFormat, formatDate, formatTime } from "./../../../helpers/formatDateTime";
import { playPauseState } from "./../../../redux/common/commonSelectors";
import { setSimpleNotification, togglePlayPause } from "./../../../redux/common/commonSlice";
import { setSelectedVoicemail } from "redux/voicemail/voicemailSlice";
import copy from "copy-to-clipboard";
import CallVolumeIcon from "components/UI/Icons/Call/CallVolume";
import ChevronUpIcon from "components/UI/Icons/Navigation/ChevronUp";

const VoicemailFooter = () => {
	const [timeProgress, setTimeProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const voicemail = useSelector(selectedVoicemail);
	const [sharePopup, setSharePopup] = useState(false);
	const playPause = useSelector(playPauseState);
	const dispatch = useDispatch();
	const audioRef = useRef(new Audio(voicemail.link));
	const progressRef = useRef() as MutableRefObject<HTMLInputElement>;
	const [prevNext, setPrevNext] = useState<number>(0);
	const voicemailList = useSelector(voicemailResults);

	useEffect(() => {
		setPrevNext(voicemail.idx);
	}, [voicemail]);

	useEffect(() => {
		if (audioRef.current.paused && playPause) {
			dispatch(togglePlayPause(true));
		} else {
			dispatch(togglePlayPause(false));
			console.log("it should be paused niggachu");
		}
	}, [audioRef, voicemail, prevNext]);

	const handleTimeRangeSlider = () => {
		setTimeProgress(parseInt(progressRef.current.value));
		audioRef.current.currentTime = parseInt(progressRef.current.value);
	};

	const handlePlayPause = () => {
		if (!playPause && audioRef.current.paused) {
			dispatch(togglePlayPause(true));
			audioRef.current.play();
		} else {
			dispatch(togglePlayPause(false));
			audioRef.current.pause();
		}
	};

	const onLoadedMetadata = () => {
		const seconds = audioRef.current.duration;
		setDuration(seconds);
		progressRef.current.max = seconds.toString();
	};

	const handleAudioTimeUpdate = () => {
		const val = audioRef.current.currentTime;
		progressRef.current.value = val.toString();
		setTimeProgress(val);
	};

	const handlePrevNext = (opt: string) => {
		if (opt === "next" && prevNext < voicemailList.length) {
			const nextVoicemail = voicemailList[voicemail.idx + 1];
			dispatch(
				setSelectedVoicemail({
					title: nextVoicemail.source_representation_name,
					time: nextVoicemail.time_received,
					duration: nextVoicemail.voicemail_file.duration,
					link: nextVoicemail.voicemail_file.link,
					idx: voicemail.idx + 1,
				}),
			);
			dispatch(togglePlayPause(true));
		} else if (opt === "prev" && prevNext > 0) {
			const nextVoicemail = voicemailList[voicemail.idx - 1];
			dispatch(
				setSelectedVoicemail({
					title: nextVoicemail.source_representation_name,
					time: nextVoicemail.time_received,
					duration: nextVoicemail.voicemail_file.duration,
					link: nextVoicemail.voicemail_file.link,
					idx: voicemail.idx - 1,
				}),
			);
			dispatch(togglePlayPause(true));
		}
	};

	const handleCopyLink = () => {
		copy(voicemail.link);
		setSharePopup(false);
		dispatch(setSimpleNotification("Link copied to clipboard"));
	};

	const handleCopyText = () => {
		copy(voicemail.transcript || "");
		setSharePopup(false);
		dispatch(setSimpleNotification("Transcript copied to clipboard"));
	};

	const handleEmail = () => {
		setSharePopup(false);
	};

	return Object.keys(voicemail).length ? (
		<div className={styles.footer}>
			<div className={styles.cont}>
				{sharePopup ? <ShareBtnPopup copyLink={handleCopyLink} copyText={handleCopyText} mail={handleEmail} /> : null}
				<div className={styles.footer_actionBtn}>
					<button
						className={`${styles.footer_action} ${styles.footer_prev}`}
						onClick={() => handlePrevNext("prev")}
						disabled={prevNext <= 0}>
						<PlayPrevIcon color={prevNext <= 0 ? "#C8D3E0" : "#0C6DC7"} />
					</button>
					{playPause ? (
						<button className={styles.footer_action} onClick={handlePlayPause}>
							<PauseIcon />
						</button>
					) : (
						<button className={`${styles.footer_action} ${styles.footer_play}`} onClick={handlePlayPause}>
							<PlayIcon />
						</button>
					)}
					<button
						className={`${styles.footer_action} ${styles.footer_next}`}
						disabled={prevNext >= voicemailList.length}
						onClick={() => handlePrevNext("next")}>
						<PlayNextIcon color={prevNext >= voicemailList.length ? "#C8D3E0" : "#0C6DC7"} />
					</button>
				</div>

				<div className={styles.footer_progressBar}>
					<input
						type="range"
						className={styles.footer_progress}
						min="0"
						onChange={handleTimeRangeSlider}
						step="1"
						ref={progressRef}
					/>
					<div className={styles.footer_cont}>
						<div className={styles.footer_details}>
							<audio
								src={voicemail.link}
								ref={audioRef}
								autoPlay
								onLoadedMetadata={onLoadedMetadata}
								onTimeUpdate={handleAudioTimeUpdate}></audio>
							<p className={styles.footer_name}>{voicemail.title}</p>
							<div className={styles.footer_dat}>
								<p className={styles.footer_month}>{convertDateFormat(voicemail.time)}</p>
								<p className={styles.footer_time}>{formatDate(voicemail.time)}</p>
							</div>
						</div>

						<div className={styles.footer_duration}>
							<p className={`${styles.footer_totalDuration} ${styles.footer_timeProgress}`}>
								{formatTime(timeProgress)}{" "}
							</p>
							<p className={styles.footer_timeSlash}>/</p>
							<p className={styles.footer_totalDuration}>{formatTime(duration)}</p>
						</div>
					</div>
				</div>

				<div className={styles.footer_otherBtns}>
					<button
						className={styles.footer_shareBtn}
						onClick={() => {
							setSharePopup((prevState: boolean) => !prevState);
						}}>
						<ShareIcon />
					</button>
					<button className={styles.footer_volumeBtn}>
						<CallVolumeIcon />
					</button>
					<button className={styles.footer_moreBtn}>
						<ChevronUpIcon />
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default VoicemailFooter;

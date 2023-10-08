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
import { togglePlayPause } from "./../../../redux/common/commonSlice";
import { setSelectedVoicemail } from "redux/voicemail/voicemailSlice";

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

	const handleTimeRangeSlider = () => {
		setTimeProgress(parseInt(progressRef.current.value));
		audioRef.current.currentTime = parseInt(progressRef.current.value);
	};

	const handlePlayPause = () => {
		if (playPause) {
			dispatch(togglePlayPause());
			audioRef.current.pause();
		} else {
			dispatch(togglePlayPause());
			audioRef.current.play();
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
		}
	};

	return Object.keys(voicemail).length ? (
		<div className={styles.footer}>
			<div className={styles.cont}>
				{sharePopup ? <ShareBtnPopup></ShareBtnPopup> : null}
				<div className={styles.footer_actionBtn}>
					<button className={styles.footer_action} onClick={() => handlePrevNext("prev")} disabled={prevNext <= 0}>
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
						className={styles.footer_action}
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
							<p className={styles.footer_totalDuration}>{formatTime(timeProgress)} </p>
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
					<button>
						<SettingsIcon />
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default VoicemailFooter;

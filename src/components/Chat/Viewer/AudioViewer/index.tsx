import styles from "./AudioViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import DownloadIcon from "components/UI/Icons/meet/Download";
import ExpandIcon from "components/UI/Icons/ChatIcons/Expand";
import VolumeIcon from "components/UI/Icons/ChatIcons/Volume";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import { useState } from "react";
import MusicIcon from "components/UI/Icons/ChatIcons/Music";
import PlayPrevIcon from "components/UI/Icons/ChatIcons/PlayPrev";
import PlayNextIcon from "components/UI/Icons/ChatIcons/PlayNext";
// import PlayPrevIcon from "components/UI/Icons/Voicemail/PlayPrev";
// import PlayNextIcon from "components/UI/Icons/Voicemail/PlayNext";
// import PlayPrevIcon from "components/UI/Icons/Voicemail/PlayPrev";

const AudioViewer = () => {
	const [isPlayBtnTrue, setIsPlayBtnTrue] = useState(false);
	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<div className={styles.nameBox}>
						<span className={styles.initials}>SG</span>
						<div>
							<p className={styles.name}>Shivam Gupta</p>
							<p>{"March 8, 2023 11:49 AM - blake-verdoorn-cssvEZacHvQ-unsplash.jpg - 256Kb"}</p>
						</div>
					</div>
					<span className={styles.close}>
						<CloseIcon />
					</span>
				</div>
				<div className={styles.content}>
					<span>
						<MusicIcon />
					</span>
					<div>Call record 2402.wav</div>
					<p>Now playing...</p>
				</div>

				<div className={styles.footer}>
					<div className={styles.progressBar}>
						<span className={styles.progress}></span>
					</div>
					<div className={styles.duration}>
						<span>01:20</span>
						<span>03:20</span>
					</div>
					<div className={styles.bottom}>
						<span className={styles.icon}>
							<VolumeIcon />
						</span>
						<div className={styles.control}>
							<span>
								<PlayPrevIcon />
							</span>

							<span
								className={styles.playPause}
								onClick={() => {
									setIsPlayBtnTrue(!isPlayBtnTrue);
								}}>
								{isPlayBtnTrue ? <PlayerPlay color="primary-default" /> : <PlayerPause color="primary-default" />}
							</span>
							<span>
								<PlayNextIcon />
							</span>
						</div>

						<span className={styles.icon}>
							<DownloadIcon color="icon-primary" />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AudioViewer;

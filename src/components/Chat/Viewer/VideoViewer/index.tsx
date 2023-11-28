import styles from "./VideoViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import PlusIcon from "components/UI/Icons/ChatIcons/Plus";
import MinusIcon from "components/UI/Icons/ChatIcons/Minus";
import DownloadIcon from "components/UI/Icons/meet/Download";
import ExpandIcon from "components/UI/Icons/ChatIcons/Expand";
import CallVolumeIcon from "components/UI/Icons/Call/CallVolume";
import VolumeIcon from "components/UI/Icons/ChatIcons/Volume";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import { useState } from "react";
// import PauseIcon from "components/UI/Icons/Sidecar/Pause";
// import PauseIcon from "components/UI/Icons/Voicemail/Pause";
// import PlayIcon from "components/UI/Icons/Voicemail/Play";

const VideoViewer = () => {
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
				{/* <img src="/img/dummy/photo.jpg" alt=""></img> */}
				{/* <img src="/img/dummy/dummy_video.png" alt=""></img> */}
				<video src="/video/video.mp4" />
				<div className={styles.footer}>
					<div className={styles.left}>
						<span
							className={styles.playPause}
							onClick={() => {
								setIsPlayBtnTrue(!isPlayBtnTrue);
							}}>
							{isPlayBtnTrue ? <PlayerPlay color="primary-default" /> : <PlayerPause color="primary-default" />}
						</span>
						<span className={styles.volume}>
							<VolumeIcon />
						</span>
						<span className={styles.duration}>02:30/03:30</span>
					</div>
					<div className={styles.progressBar}>
						<span className={styles.progress}></span>
					</div>
					<div className={styles.iconBox}>
						<span className={styles.icon}>
							<ExpandIcon />
						</span>
						<span className={styles.icon}>
							<DownloadIcon />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoViewer;

import styles from "./VideoViewer.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import DownloadIcon from "components/UI/Icons/meet/Download";
import ExpandIcon from "components/UI/Icons/ChatIcons/Expand";
import VolumeIcon from "components/UI/Icons/ChatIcons/Volume";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import PlayerPause from "components/UI/Icons/ChatIcons/PlayerPause";
import { useState } from "react";

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
							<DownloadIcon color="icon-primary" />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoViewer;

import React from "react";
import styles from "./SelectedVideo.module.scss";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";

const SelectedVideo = () => {
	return (
		<div className={styles.selectedVideo}>
			<img src="/img/dummy/dummy_video.png" alt="" />
			<span className={styles.close}>
				<CrossIcon />
			</span>
			<span className={styles.btnPlay}>
				<BtnPlay />
			</span>
		</div>
	);
};

export default SelectedVideo;

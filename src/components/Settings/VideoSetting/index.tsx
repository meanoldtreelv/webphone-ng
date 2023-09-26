import React from "react";
import styles from "./VideoSetting.module.scss";
import VideoIcon from "components/UI/Icons/Video";
import OnOffSwitch from "components/UI/OnOffSwitch";

const VideoSetting = () => {
	return (
		<div className={styles.video}>
			<h1 className={`body_bold ${styles.heading}`}>Video Devices</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Video input device</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="AV-Capture: Camera FaceTime HD">AV-Capture: Camera FaceTime HD</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<VideoIcon />
						</span>
					</div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Video preset</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">Default</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<VideoIcon />
						</span>
					</div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Video resolution</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">1080p (1920x1024)</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<VideoIcon />
						</span>
					</div>
				</div>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Video Preview</h1>
			<div>
				<OnOffSwitch />
			</div>
		</div>
	);
};

export default VideoSetting;

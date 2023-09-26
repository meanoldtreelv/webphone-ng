import React from "react";
import styles from "./AudioSetting.module.scss";
import SpeakerIcon from "components/UI/Icons/Speaker";
import MicrophoneIcon from "components/UI/Icons/Microphone";

const AudioSetting = () => {
	return (
		<div className={styles.audio}>
			<h1 className={`body_bold ${styles.heading}`}>Playback Devices</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Playback Device</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<SpeakerIcon />
						</span>
					</div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Loud Playback Device</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<SpeakerIcon />
						</span>
					</div>
				</div>
				<div>
					<h2 className={`caption_1 ${styles.heading2}`}>Playback Gain</h2>
					<div></div>
				</div>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Capture Devices</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Device</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<MicrophoneIcon />
						</span>
					</div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Gain</h2>
				</div>
				<div>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Level</h2>
					<div></div>
				</div>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Ring</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Ringer Device</h2>
					<div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<SpeakerIcon />
						</span>
					</div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Ring Sound</h2>
				</div>
				<div>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Level</h2>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default AudioSetting;

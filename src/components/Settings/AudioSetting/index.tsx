import React from "react";
import styles from "./AudioSetting.module.scss";
import SpeakerIcon from "components/UI/Icons/Speaker";
import MicrophoneIcon from "components/UI/Icons/Microphone";
import RangeSlider from "components/UI/Forms/RangeSlider";
import Select from "components/UI/Forms/Select";
import OnOffSwitch from "components/UI/OnOffSwitch";

const AudioSetting = () => {
	return (
		<div className={styles.audio}>
			<h1 className={`body_bold ${styles.heading}`}>Playback Devices</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Playback Device</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<SpeakerIcon />
						</span>
					</div> */}
					<Select icon={<SpeakerIcon />} options={[]} />
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Loud Playback Device</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<SpeakerIcon />
						</span>
					</div> */}
					<Select icon={<SpeakerIcon />} options={[]} />
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Playback Gain</h2>
					<div className={`${styles.optionBox}`}>
						<RangeSlider />
					</div>
				</div>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Capture Devices</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Device</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<MicrophoneIcon />
						</span>
					</div> */}
					<Select icon={<MicrophoneIcon />} options={[]} />
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Gain</h2>
					<div className={`${styles.optionBox}`}>
						<RangeSlider />
					</div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Capture Level</h2>
					<div className={`${styles.optionBox}`}></div>
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>
						<OnOffSwitch />
						<span className={`caption_1`}>Enable echo cancellation</span>
					</h2>
					<div className={`${styles.optionBox}`}>
						<p>
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
								<path
									d="M3.5 8.25V9.75M6.5 6.75V11.25M9.5 3V15M12.5 8.25V9.75M15.5 6V12"
									stroke="#C8D3E0"
									stroke-linecap="round"
								/>
							</svg>
							<span>Calibrate</span>
						</p>
					</div>
				</div>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Ring</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Ringer Device</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<SpeakerIcon />
						</span>
					</div> */}
					<Select icon={<SpeakerIcon />} options={[]} />
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Ring Sound</h2>
					<Select icon={<SpeakerIcon />} options={[]} />
				</div>
			</div>
		</div>
	);
};

export default AudioSetting;

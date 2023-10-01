import React from "react";
import styles from "./VideoSetting.module.scss";
import VideoIcon from "components/UI/Icons/Video";
import OnOffSwitch from "components/UI/OnOffSwitch";
import Select from "components/UI/Forms/Select";
import InfoIcon from "components/UI/Icons/Info";

const VideoSetting = () => {
	return (
		<div className={styles.video}>
			<h1 className={`body_bold ${styles.heading}`}>Video Devices</h1>
			<div className={styles.settingBox}>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Video input device</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="AV-Capture: Camera FaceTime HD">AV-Capture: Camera FaceTime HD</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<VideoIcon />
						</span>
					</div> */}
					<Select icon={<VideoIcon />} options={[]} />
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Video preset</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">Default</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<VideoIcon />
						</span>
					</div> */}
					<Select icon={<VideoIcon />} options={[]} />
				</div>
				<div className={`${styles.setting}`}>
					<h2 className={`caption_1 ${styles.heading2}`}>Video resolution</h2>
					{/* <div className={`${styles.optionBox}`}>
						<select name="" id="" className={`caption_1`}>
							<option value="">1080p (1920x1024)</option>
							<option value="">MacBook Pro Speakers</option>
							<option value="">MacBook Pro Speakers</option>
						</select>
						<span>
							<VideoIcon />
						</span>
					</div> */}
					<Select icon={<VideoIcon />} options={[]} />
				</div>
			</div>
			<h1 className={`body_bold ${styles.heading}`}>Video Preview</h1>
			<div className={styles.setting2}>
				<h2 className={`caption_1 ${styles.previewBox}`}>
					<p>
						<OnOffSwitch />
						<span className={`caption_1`}>Show preview</span>
					</p>
					<p>
						<InfoIcon />
						<span className={`caption_1`}>1920x1080, 30 fps</span>
					</p>
				</h2>
				<div className={`${styles.imageBox}`}>
					<img
						src={
							"https://s3-alpha-sig.figma.com/img/d4bb/69d9/c804f22b6de27252ddee4f4719fb41a4?Expires=1696809600&Signature=VjuUlUxb7EMxWddHlquGffI7BAU74Ms0wNfipaalobdXLo9kKPJIBGl0FdxmrX7KGMkfvXBum3s4QqNkUHe~wuO8ccC4niEDhvlhHelE~HesOhHmMXbB4LC4KnU39qixI0ubBa06VcBq14DZ6eXBLb25-tX0xsdkxouajIehs6S6UGEQdwNHgH4zzpceQRZaPSoAXyOf4bs1mT-XKqTfhMDVsDBdhUO~r~ah9dHa7kwURNMgWO3H96aHLAghqWzymKRkCk5ZpzPJ7AMyYCKD8l8BM8xepxnRWUkxSSnUYMktIvDPYVVeElg-GXsOEKu-8-udV55Vcndw1zgwnJd~tg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
						}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoSetting;

import React from "react";
import styles from "./SelectedAudio.module.scss";
import MusicIcon from "components/UI/Icons/ChatIcons/Music";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";

const SelectedAudio = () => {
	return (
		<div className={styles.selectedAudio}>
			<MusicIcon />
			<b>Call record 1309.wav</b>
			<span>
				<CrossIcon />
			</span>
		</div>
	);
};

export default SelectedAudio;

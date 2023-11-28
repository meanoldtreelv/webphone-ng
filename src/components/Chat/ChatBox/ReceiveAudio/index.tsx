import React from "react";
import styles from "./ReceiveAudio.module.scss";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import SoundWaves1 from "../../../../assets/images/img/sound_wave_receive.svg";

const ReceiveAudio = () => {
	return (
		<div className={styles.receiveAudio}>
			<div className={styles.audio}>
				<PlayerPlay color="primary-default" />
				<div>
					<img src={SoundWaves1} alt="" />
					<span className={styles.soundDetails}>
						<span>Call record 2402.wav</span>
						<span className={styles.duration}>01:30</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ReceiveAudio;

import PlayIcon from "components/UI/Icons/Voicemail/Play";
import styles from "./BottomPlayer.module.scss";
import PlayPrevIcon from "components/UI/Icons/Voicemail/PlayPrev";
import PlayNextIcon from "components/UI/Icons/Voicemail/PlayNext";

const BottomPlayer = () => {
	return (
		<div className={styles.bottomPlayer}>
			<div className={styles.profileImage}>
				<div>
					<h2>MD</h2>
				</div>
			</div>

			<div className={styles.audioInf}>
				<h4>Audio Title</h4>
				<p>Ext. 1004</p>
			</div>

			<div className={styles.playerMain}>
				<section className={styles.playerMain_timer}>
					<p>00:00</p>
					<p>00:12</p>
				</section>
				<input type="range" />

				<section className={styles.playerMain_playerControl}>
					<button className={styles.controlPrevNext}>
						<PlayPrevIcon color="#0C6DC7" />
					</button>
					<button className={styles.controlPlay}>
						<PlayIcon />
					</button>
					<button className={styles.controlPrevNext}>
						<PlayNextIcon color="#0C6DC7" />
					</button>
				</section>
			</div>

			<div className={styles.audioTranscription}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore possimus repellendus laborum nulla rerum, odio
					veniam cupiditate natus a eos! veniam cupiditate natus a eos!
				</p>
			</div>
		</div>
	);
};

export default BottomPlayer;

import styles from "./VoicemailFooter.module.scss";
import ShareBtnPopup from "../ShareBtnPopup";
import PlayPrevIcon from "./../../../components/UI/Icons/Voicemail/PlayPrev";
import PauseIcon from "./../../../components/UI/Icons/Voicemail/Pause";
import PlayNextIcon from "./../../../components/UI/Icons/Voicemail/PlayNext";
import ShareIcon from "./../../../components/UI/Icons/Voicemail/Share";
import SettingsIcon from "../Settings";

const VoicemailFooter = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.cont}>
				<ShareBtnPopup></ShareBtnPopup>
				<div className={styles.footer_actionBtn}>
					<span className={styles.footer_action}>
						<PlayPrevIcon />
					</span>
					<span className={styles.footer_action}>
						<PauseIcon />
					</span>
					<span className={styles.footer_action}>
						<PlayNextIcon />
					</span>
				</div>

				<div className={styles.footer_progressBar}>
					<div className={styles.footer_progress}></div>
					<div className={styles.footer_cont}>
						<div className={styles.footer_details}>
							<p className={styles.footer_name}>Melisa Townsend</p>
							<div className={styles.footer_dat}>
								<p className={styles.footer_month}>March</p>
								<p className={styles.footer_date}>12,</p>
								<p className={styles.footer_year}>2023</p>
								<p className={styles.footer_time}>10:33</p>
								<p className={styles.footer_morning}>AM</p>
							</div>
						</div>

						<div className={styles.footer_duration}>
							<p className={styles.footer_currentprogress}>00:12 /</p>
							<p className={styles.footer_totalDuration}>0:15</p>
						</div>
					</div>
				</div>

				<div className={styles.footer_otherBtns}>
					<span className={styles.footer_shareBtn}>
						<ShareIcon />
					</span>
					<span>
						<SettingsIcon />
					</span>
				</div>
			</div>
		</div>
	);
};

export default VoicemailFooter;

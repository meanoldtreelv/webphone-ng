import { useState } from "react";
import styles from "./VoicemailCard.module.scss";
import PopupMenu from "../PopupMenu";
import playIcon from "./../../../assets/images/icon/player-play.svg";
import phoneIcon from "./../../../assets/images/icon/voicemail_phone.svg";
import TranscriptIcon from "./../../../components/UI/Icons/Voicemail/Transcript";
import menuIcon from "./../../../assets/images/icon/voicemail_menu.svg";

const VoicemailCard = () => {
	let [transcripts, setTranscript] = useState(false);

	return (
		<div className={styles.card}>
			<div className={styles.card_mainCont}>
				<div className={styles.card_cont1}>
					<img src={playIcon} alt="" />
					<div className={styles.card_unread}></div>
					<p className={styles.card_name}>Melisa Townsend</p>
				</div>

				<div className={styles.card_cont2}>
					<p className={styles.card_ext}>Ext. 6002</p>
					<p className={styles.card_duration}>0:15 sec</p>
					<p className={styles.card_time}>10:55 PM</p>
					<div className={styles.card_icons}>
						<span className={styles.card_phone}>
							<img src={phoneIcon} alt="" />
						</span>

						<span
							className={styles.card_transcriptIcon}
							onClick={() => {
								setTranscript(!transcripts);
							}}>
							<TranscriptIcon transcripts />
						</span>

						<span className={styles.card_menu}>
							<img src={menuIcon} alt="" />
						</span>
					</div>
				</div>
			</div>
			{transcripts === true ? (
				<div className={styles.card_transcript}>
					<div className={styles.card_head}>Transcript</div>
					<div className={styles.card_des}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio euismod ut pellentesque massa ac, et
						augue. Mauris non aenean adipiscing enim turpis nunc elementum vel sed.
					</div>
				</div>
			) : (
				<></>
			)}
			<PopupMenu></PopupMenu>
		</div>
	);
};

export default VoicemailCard;

import React from "react";
import style from "./voicemailCard.module.scss";
const VoicemailCard = () => {
	return (
		<div className={style.card}>
			<div className={style.card_mainCont}>
				<div className={style.card_cont1}>
					<span>
						<img src="/icon/player-play.svg" alt="" />
					</span>
					<div className={style.card_unread}></div>
					<div className={`caption_1 ${style.card_name}`}>Melisa Townsend</div>
				</div>

				<div className={style.card_cont2}>
					<div className={`caption_1 ${style.card_ext}`}>Ext. 6002</div>
					<div className={`caption_1 ${style.card_duration}`}>0:15 sec</div>
					<div className={`caption_1 ${style.card_time}`}>10:55 PM</div>
					<div className={style.card_icons}>
						<span className={style.card_phone}>
							<img src="/icon/voicemail_phone.svg" alt="" />
						</span>

						<span className={style.card_transcriptIcon}>
							<img src="/icon/transcript.svg" alt="" />
						</span>

						<span className={style.card_menu}>
							<img src="/icon/voicemail_menu.svg" alt="" />
						</span>
					</div>
				</div>
			</div>
			<div className={style.card_transcript}>
				<div className={`caption_2 ${style.card_head}`}>Transcript</div>
				<div className={`caption_1 ${style.card_des}`}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio euismod ut pellentesque massa ac, et augue.
					Mauris non aenean adipiscing enim turpis nunc elementum vel sed.
				</div>
			</div>
		</div>
	);
};

export default VoicemailCard;

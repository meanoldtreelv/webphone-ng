import React, { useState } from "react";
import style from "./voicemailCard.module.scss";
import PopupMenu from "../PopupMenu";

const VoicemailCard = () => {
	let [transcripts, setTranscript] = useState(false);

	return (
		<div className={style.card}>
			<div className={style.card_mainCont}>
				<div className={style.card_cont1}>
					<span>
						<img src="/icon/player-play.svg" alt="" />
					</span>
					<div className={style.card_unread}></div>
					<div className={`caption_1 ${style.card_name}`} style={{color:"var(--text-primary, #1F2023)"}}>Melisa Townsend</div>
				</div>

				<div className={style.card_cont2}>
					<div className={`caption_1 ${style.card_ext}`} style={{color:"var(--text-primary, #1F2023)"}}>Ext. 6002</div>
					<div className={`caption_1 ${style.card_duration}`} style={{color:"var(--text-primary, #1F2023)"}}>0:15 sec</div>
					<div className={`caption_1 ${style.card_time}`} style={{color:"var(--text-primary, #1F2023)"}}>10:55 PM</div>
					<div className={style.card_icons}>
						<span className={style.card_phone}>
							<img src="/icon/voicemail_phone.svg" alt="" />
						</span>

						<span
							className={style.card_transcriptIcon}
							onClick={() => {
								setTranscript(!transcripts);
							}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M8.50002 1.33301V4.33301C8.50002 5.34553 9.32083 6.16634 10.3334 6.16634H13.3334V13.333C13.3334 14.0694 12.7364 14.6663 12 14.6663H4.00002C3.26364 14.6663 2.66669 14.0694 2.66669 13.333V2.66634C2.66669 1.92996 3.26364 1.33301 4.00002 1.33301H8.50002ZM6.83335 7.33301C7.1095 7.33301 7.33335 7.55687 7.33335 7.83301V12.833C7.33335 13.1091 7.1095 13.333 6.83335 13.333C6.55721 13.333 6.33335 13.1091 6.33335 12.833V7.83301C6.33335 7.55687 6.55721 7.33301 6.83335 7.33301ZM9.33335 9.16634C9.33335 8.8902 9.1095 8.66634 8.83335 8.66634C8.55721 8.66634 8.33335 8.8902 8.33335 9.16634V11.4997C8.33335 11.7758 8.55721 11.9997 8.83335 11.9997C9.1095 11.9997 9.33335 11.7758 9.33335 11.4997V9.16634ZM10.8334 9.33301C11.1095 9.33301 11.3334 9.55687 11.3334 9.83301V10.833C11.3334 11.1091 11.1095 11.333 10.8334 11.333C10.5572 11.333 10.3334 11.1091 10.3334 10.833V9.83301C10.3334 9.55687 10.5572 9.33301 10.8334 9.33301ZM5.33335 9.83301C5.33335 9.55687 5.1095 9.33301 4.83335 9.33301C4.55721 9.33301 4.33335 9.55687 4.33335 9.83301V10.833C4.33335 11.1091 4.55721 11.333 4.83335 11.333C5.1095 11.333 5.33335 11.1091 5.33335 10.833V9.83301Z"
									fill={transcripts === false ? "#6C7A8B" : "#1480E1"}
								/>
								<path
									d="M9.50002 1.54344V4.33301C9.50002 4.79325 9.87312 5.16634 10.3334 5.16634H13.1229C13.0715 5.08607 13.0113 5.01094 12.9428 4.94248L9.72388 1.72353C9.65543 1.65508 9.5803 1.59484 9.50002 1.54344Z"
									fill="#6C7A8B"
								/>
							</svg>
						</span>

						<span className={style.card_menu}>
							<img src="/icon/voicemail_menu.svg" alt="" />
						</span>
					</div>
				</div>
			</div>
			{transcripts === true ? (
				<div className={`${style.card_transcript}`}>
					<div className={`caption_2 ${style.card_head}`}>Transcript</div>
					<div className={`caption_1 ${style.card_des}`}>
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

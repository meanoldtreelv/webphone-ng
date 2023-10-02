import React, { useState } from "react";
import styles from "./VoicemailCard.module.scss";
import PopupMenu from "./../PopupMenu";
import playIcon from "./../../../assets/images/icon/player-play.svg";
import phoneIcon from "./../../../assets/images/icon/voicemail_phone.svg";
import TranscriptIcon from "./../../../components/UI/Icons/Voicemail/Transcript";
import menuIcon from "./../../../assets/images/icon/voicemail_menu.svg";
import { formatDate, toSecMinAndHr } from "./../../../helpers/formatDateTime";
import { useDispatch, useSelector } from "react-redux";
import {
	setMoreOptVoicemailId,
	setSelectedVoicemail,
	setSelectedVoicemailList,
} from "./../../../redux/voicemail/voicemailSlice";
import { playPauseState } from "./../../../redux/common/commonSelectors";
import PauseIcon from "./../../../components/UI/Icons/Voicemail/Pause";
import { togglePlayPause } from "./../../../redux/common/commonSlice";
import TrashIcon from "./../../../components/UI/Icons/Voicemail/Trash";
import ShareIcon from "./../../../components/UI/Icons/Voicemail/Share";
import LinkIcon from "./../../../components/UI/Icons/Voicemail/Link";
import CopyIcon from "./../../../components/UI/Icons/Voicemail/Copy";
import EnvelopIcon from "./../../../components/UI/Icons/Voicemail/Envelop";
import ChatIcon from "components/UI/Icons/Voicemail/Chat";
import { selectVoicemails, selectedVoicemails } from "redux/voicemail/voicemailSelectors";

interface IVoicemailCard {
	id: string;
	title: string;
	ext: number;
	duration: number;
	time: string;
	transcript?: string;
	link: string;
	listened: boolean;
	deleteModal: (del: boolean) => void | undefined;
}

const VoicemailCard: React.FC<IVoicemailCard> = ({
	id,
	title,
	ext,
	duration,
	time,
	transcript,
	link,
	deleteModal,
	listened,
}) => {
	let [transcripts, setTranscript] = useState(false);
	const dispatch = useDispatch();
	const playPause = useSelector(playPauseState);
	const [popupMenu, setPopupMenu] = useState(false);
	const isSelectVoicemails = useSelector(selectVoicemails);
	const selectedVoicemailsList = useSelector(selectedVoicemails);

	const handlePlayAudio = () => {
		dispatch(
			setSelectedVoicemail({
				title,
				time,
				duration,
				link,
			}),
		);
		dispatch(togglePlayPause());
	};

	const handlePauseAudio = () => {
		dispatch(togglePlayPause());
	};

	const popupMenuOpts = [
		{ icon: <ChatIcon />, title: "Send Message" },
		{
			icon: <TrashIcon />,
			title: "Delete",
			clicked: () => {
				deleteModal(true);
				setPopupMenu(false);
			},
		},
		{ icon: <ShareIcon />, title: "Share" },
		{ icon: <LinkIcon />, title: "Copy Link" },
		{ icon: <CopyIcon />, title: "Copy Text" },
		,
		{ icon: <EnvelopIcon />, title: "Share via Email" },
	];

	const handlePopupMenu = () => {
		setPopupMenu((prevState) => !prevState);
		dispatch(setMoreOptVoicemailId(id));
	};

	const handleSelectInput = (event: any) => {
		dispatch(setSelectedVoicemailList(id));
	};

	return (
		<div className={styles.card}>
			<div className={styles.card_mainCont}>
				<div className={styles.card_cont1}>
					{isSelectVoicemails && <input type="checkbox" name="" id="" onChange={handleSelectInput} />}

					<button onClick={handlePlayAudio}>
						<img src={playIcon} alt="" />
					</button>

					{!listened && <div className={styles.card_unread}></div>}
					<p className={styles.card_name}>{title}</p>
				</div>

				<div className={styles.card_cont2}>
					<p className={styles.card_ext}>Ext. {ext}</p>
					<p className={styles.card_duration}>{toSecMinAndHr(duration)}</p>
					<p className={styles.card_time}>{formatDate(time)}</p>
					<div className={styles.card_icons}>
						<button className={styles.card_phone}>
							<img src={phoneIcon} alt="" />
						</button>

						<button
							className={styles.card_transcriptIcon}
							onClick={() => {
								setTranscript(!transcripts);
							}}>
							<TranscriptIcon transcripts />
						</button>

						<button className={styles.card_menu} onClick={handlePopupMenu}>
							<img src={menuIcon} alt="" />
						</button>
					</div>
				</div>
			</div>
			{transcripts && (
				<div className={styles.card_transcript}>
					<div className={styles.card_head}>Transcript</div>
					<div className={styles.card_des}>{transcript}</div>
				</div>
			)}
			{popupMenu ? <PopupMenu id={id}>{popupMenuOpts}</PopupMenu> : null}
		</div>
	);
};

export default VoicemailCard;

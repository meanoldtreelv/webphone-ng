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
import { setSimpleNotification, togglePlayPause } from "./../../../redux/common/commonSlice";
import TrashIcon from "./../../../components/UI/Icons/Voicemail/Trash";
import ShareIcon from "./../../../components/UI/Icons/Voicemail/Share";
import LinkIcon from "./../../../components/UI/Icons/Voicemail/Link";
import CopyIcon from "./../../../components/UI/Icons/Voicemail/Copy";
import EnvelopIcon from "./../../../components/UI/Icons/Voicemail/Envelop";
import ChatIcon from "components/UI/Icons/Voicemail/Chat";
import { selectVoicemails, selectedVoicemail, selectedVoicemails } from "redux/voicemail/voicemailSelectors";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router";
import sip from "lib/sip";

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
	idx: number;
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
	idx,
}) => {
	let [transcripts, setTranscript] = useState(false);
	const dispatch = useDispatch();
	const playPause = useSelector(playPauseState);
	const [popupMenu, setPopupMenu] = useState(false);
	const isSelectVoicemails = useSelector(selectVoicemails);
	const selectedVoicemailsList = useSelector(selectedVoicemails);
	const playing = useSelector(selectedVoicemail);
	const navigate = useNavigate();

	const handlePlayAudio = () => {
		dispatch(
			setSelectedVoicemail({
				title,
				time,
				duration,
				link,
				idx,
				transcript
			}),
		);
		dispatch(togglePlayPause(true));
	};

	const handlePauseAudio = () => {
		dispatch(togglePlayPause(false));
	};

	const handleCopyLink = () => {
		copy(link);
		setPopupMenu(false);
		dispatch(setSimpleNotification("Link copied to clipboard"));
	};

	const handleCopyText = () => {
		copy(transcript || "");
		setPopupMenu(false);
		dispatch(setSimpleNotification("Transcript copied to clipboard"));
	};

	const handleShare = () => {
		const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(link)}`;
		window.open(mailtoUrl, "_blank");
	};

	const popupMenuOpts = [
		// { icon: <ChatIcon />, title: "Send Message" },
		{
			icon: <TrashIcon />,
			title: "Delete",
			clicked: () => {
				deleteModal(true);
				setPopupMenu(false);
			},
		},
		{ icon: <LinkIcon />, title: "Copy Link", clicked: handleCopyLink },
		{ icon: <CopyIcon />, title: "Copy Text", clicked: handleCopyText },
		,
		{ icon: <EnvelopIcon />, title: "Share via Email", clicked: handleShare },
	];

	const handlePopupMenu = () => {
		setPopupMenu((prevState) => !prevState);
		dispatch(setMoreOptVoicemailId(id));
	};

	const handleSelectInput = () => {
		!selectedVoicemailsList.includes(id)
			? dispatch(setSelectedVoicemailList({ type: "ADD", id }))
			: dispatch(setSelectedVoicemailList({ id }));
	};

	const handleCall = () => {
		sip.call(String(ext));
		navigate("/dashboard");
	};

	return (
		<div className={styles.card} style={{ background: playing.idx === idx ? "rgb(245, 245, 253)" : "" }}>
			<div className={styles.card_mainCont}>
				<div className={styles.card_cont1}>
					{isSelectVoicemails && <input type="checkbox" name="" id="" onChange={handleSelectInput} />}

					{playPause && playing.idx === idx ? (
						<button onClick={handlePauseAudio} className={styles.pauseIconBtn}>
							<PauseIcon />
						</button>
					) : (
						<button onClick={handlePlayAudio}>
							<img src={playIcon} alt="" />
						</button>
					)}

					{!listened && <div className={styles.card_unread}></div>}
					<p className={styles.card_name}>{title}</p>
				</div>

				<div className={styles.card_cont2}>
					<p className={styles.card_ext}>Ext. {ext}</p>
					<p className={styles.card_duration}>{toSecMinAndHr(duration)}</p>
					<p className={styles.card_time}>{formatDate(time)}</p>
					<div className={styles.card_icons}>
						<button className={styles.card_phone} onClick={handleCall}>
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
			{transcripts ? (
				<div className={styles.card_transcript}>
					<div className={styles.card_head}>Transcript</div>
					<div className={styles.card_des}>{transcript}</div>
				</div>
			) : (
				<div className={styles.transcriptHighlight}>
					<p>{transcript}</p>
				</div>
			)}
			{popupMenu ? <PopupMenu id={id}>{popupMenuOpts}</PopupMenu> : null}
		</div>
	);
};

export default VoicemailCard;

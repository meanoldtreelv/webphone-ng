import styles from "./ConferenceCallListMember.module.scss";
import ContactProfile from "components/UI/ContactProfile";
import CallEndIcon from "components/UI/Icons/Call/CallEnd";
import sip from "lib/sip";
import { Dispatch, SetStateAction } from "react";
import { nameIcon } from "utils";


const ConferenceCallListMember = ({ lineNumber, details, hoverOn, setHoverOn, host=false }: { lineNumber: number, details: { id: number, callTimer: string, name: string, number: string, startTime: string, billsec: string, disposition: string }, hoverOn: number, setHoverOn: Dispatch<SetStateAction<number>>, host?:boolean }) => {
	const hungup = () => {
		sip.disposeConference(lineNumber, details.id)
	}
	return (
		<button className={styles.conferenceCard} onMouseOver={() => { setHoverOn(details.id); }} onMouseOut={() => { setHoverOn(-1); }}>
			<div className={styles.cardLeft}>
				<div className={`${styles.cardLeft_circle} ${(details.callTimer === "00:00" || details.disposition === "Bye") && styles.cardLeft_circle_disabled}`}>
					<ContactProfile abbreviation={nameIcon(details.name)} />
				</div>
				<div className={styles.cardLeft_right}>
					<p>{details.name}</p>
					<p>
						<span className={`caption_1`}>
							{details.number}
						</span>
					</p>
				</div>
			</div>
			{
				((!(hoverOn === details.id) || details.disposition === "Bye")||host) &&
				(<div className={styles.cardRight}>
					<p>{details.startTime}</p>
					<p>{details.callTimer === "00:00" ? details.disposition : details.disposition === "Bye" ? "End " + details.callTimer : details.callTimer}</p>
				</div>)
			}
			{
				!host && hoverOn === details.id && details.disposition !== "Bye" && (
					<div className={`${styles.control} ${styles.endButton}`} onClick={hungup}>
						<CallEndIcon fill="#c8c9cb" height="30" />
					</div>
				)
			}
		</button>
	);
};

export default ConferenceCallListMember;

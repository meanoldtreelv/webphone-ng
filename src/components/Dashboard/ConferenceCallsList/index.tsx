import XIcon from "components/UI/Icons/X";
import styles from "./ConferenceCallsList.module.scss";
import ConferenceCallListMember from "../ConferenceCallListMember";
import { store } from "redux/store";
const ConferenceCallsList = ({
	LineNumber,
	conferenceCallList = [],
}: {
	LineNumber: number;
	conferenceCallList: {
		id: number;
		startTime: string;
		callTimer: string;
		disposition: string;
		dispositionTime: string;
		to: string;
	}[];
}) => {
	const close = () => {
		store.dispatch({
			type: "sip/answeredCalls",
			payload: { action: "showConferenceCallsList", data: { lineNum: LineNumber, showConferenceCallsList: false } },
		});
	};
	const addMember = () => {
		store.dispatch({
			type: "sip/answeredCalls",
			payload: { action: "showAddConferenceCall", data: { lineNum: LineNumber, showAddConferenceCall: true } },
		});
		close();
	};
	return (
		<section className={styles.overlay}>
			<div className={styles.ConferenceCallsList}>
				<div className={styles.ConferenceCallsList_header}>
					<span className={styles.headerTitle}>Conference Members</span>
					<button onClick={close}>
						<XIcon />
					</button>
				</div>
				<div className={styles.ConferenceCallsList_header} style={{ padding: "0 17px" }}>
					<span>Members({conferenceCallList?.length})</span>
					<button onClick={addMember}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path
								fillRule="evenodd"
								d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
							/>
						</svg>
					</button>
				</div>
				<div>
					{conferenceCallList?.map((item) => (
						<ConferenceCallListMember
							lineNumber={LineNumber}
							details={{
								id: item.id,
								callTimer: item.callTimer,
								billsec: item.startTime,
								name: item.to,
								number: item?.to,
								startTime: item.startTime,
								disposition: item.disposition,
							}}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default ConferenceCallsList;

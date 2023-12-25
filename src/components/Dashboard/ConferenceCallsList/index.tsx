import XIcon from "components/UI/Icons/X";
import styles from "./ConferenceCallsList.module.scss";
import ConferenceCallListMember from "../ConferenceCallListMember";
import { store } from "redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
const ConferenceCallsList = ({
	LineNumber,
	conferenceCallList = [],
	host2,
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
	host2: {
		startTime: string;
		callTimer: string;
		callTimerConf: string;
		displayNumber: string;
		displayName: string;
		disposition: string;
	};
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
	const [hoverOn, setHoverOn] = useState(-1);
	const { extNumber } = useSelector((state: any) => state.sip);
	return (
		<section className={styles.overlay}>
			<div className={styles.ConferenceCallsList}>
				<div className={styles.ConferenceCallsList_header}>
					<span className={styles.headerTitle}>Conference Members</span>
					<button onClick={close}>
						<XIcon />
					</button>
				</div>
				<div>
					<div>
						<div className={styles.ConferenceCallsList_header} style={{ padding: "0 17px" }}>
							<span>Host</span>
						</div>
						<div>
							<ConferenceCallListMember
								host={true}
								hoverOn={hoverOn}
								setHoverOn={setHoverOn}
								lineNumber={LineNumber}
								details={{
									id: -2,
									callTimer: host2.callTimer,
									billsec: "",
									name: extNumber,
									number: extNumber,
									startTime: "",
									disposition: "Host",
								}}
							/>
						</div>
					</div>
					<div>
						<div className={styles.ConferenceCallsList_header} style={{ padding: "0 17px" }}>
							<span>Members({conferenceCallList?.filter(element => element.disposition!== "Bye" ).length + 1})</span>
							<button onClick={addMember}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
									<path
										fill-rule="evenodd"
										d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
									/>
								</svg>
							</button>
						</div>
						<div style={{ overflowY: "auto" }}>
							{
								<ConferenceCallListMember
									host={true}
									hoverOn={hoverOn}
									setHoverOn={setHoverOn}
									lineNumber={LineNumber}
									details={{
										id: -3,
										callTimer: host2.callTimerConf,
										billsec: host2.startTime,
										name: host2.displayName,
										number: host2.displayNumber,
										startTime: host2.startTime,
										disposition: host2.disposition,
									}}
								/>
							}
							{conferenceCallList?.map((item) => (
								item.disposition !== "Bye"?
								<ConferenceCallListMember
									hoverOn={hoverOn}
									setHoverOn={setHoverOn}
									lineNumber={LineNumber}
									details={{
										id: item.id,
										callTimer: item.callTimer,
										billsec: item.startTime,
										name: item.to,
										number: item.to,
										startTime: item.startTime,
										disposition: item.disposition,
									}}
								/>:""
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ConferenceCallsList;
